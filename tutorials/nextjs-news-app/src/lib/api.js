async function fetchAPI(query, {variables} = {}) {
  const read = process.env.NEXT_PUBLIC_WEBINY_API_READ_URL;

  const res = await fetch(read, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEBINY_API_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.error);
  }
  return json.data;
}

export async function getAllNews() {
  const news = await fetchAPI(
    `query NewsPost {
       listNews {
        data {
         id
         image
         title
         excerpt
         description
         author
         createdOn
         slugUrl
        }
       }
      }
     `,
    {},
    true
  );
  return news.listNews.data;
}

export async function getNewsBySlug(slug) {
  const getSlug = await fetchAPI(
    `query NewsBySlug($NewGetWhereInput: NewGetWhereInput!) {
      listNews: getNew(where: $NewGetWhereInput) {
        data {
          id
          title
          image
          slugUrl
          excerpt
          createdOn,
          description,
          author
        }
      }
    }`,
    {
      variables: {
        NewGetWhereInput: {
          slugUrl: slug,
        },
      },
    }
  );
  return getSlug.listNews.data;
}

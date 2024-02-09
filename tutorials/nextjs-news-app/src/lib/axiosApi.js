import axios from "axios";

let domain = "techcrunch.com,thenextweb.com";
let pageSize = 10;
export const url = `${process.env.NEXT_PUBLIC_NEWS_API_URL}domains=${domain}&pageSize=${pageSize}&from=2024-01-13&to=2024-01-16&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`;
const cleanSlug = (urls) => {
  urls = urls.replace(/\/$/, "");
  return urls.split("/").pop();
};

// create axios client
const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEBINY_API_SECRET}`,
  },
});

export default axiosClient;

// list of queries
const create = `
mutation createNew($title:String!, $excerpt:String!, $author:String!, $description:String!, $slugUrl:String!, $image:String!) {
  createNew(data:{title:$title, excerpt:$excerpt, author:$author, description:$description, slugUrl:$slugUrl, image:$image}) {
    data {
      id
      title
      excerpt
      description
      author
      image
    }
  }
}
`;

const publish = ` 
mutation publishNew($id:ID!) {
  publishNew(revision:$id) {
    data{
      id
      title
      excerpt
      description
      author
    }
  }
} 
`;

// publish news function
export async function publishNews(data) {
  await axiosClient({
    url: process.env.NEXT_PUBLIC_WEBINY_API_MANAGE_URL,
    method: "POST",
    data: JSON.stringify({
      query: publish,
      variables: {
        id: data?.data?.createNew?.data?.id,
      },
    }),
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Something happened", err);
    });
}

// post news function
export async function addNews(data) {
  await axiosClient({
    url: process.env.NEXT_PUBLIC_WEBINY_API_MANAGE_URL,
    method: "POST",
    data: JSON.stringify({
      query: create,
      variables: {
        title: data.title,
        excerpt: data.description,
        author: data.author,
        description: data.content,
        slugUrl: cleanSlug(data.url),
        image: data.urlToImage,
      },
    }),
  })
    .then((res) => {
      // publishNews(res.data);
    })
    .catch((err) => {
      console.log("something happened", err);
    });
}

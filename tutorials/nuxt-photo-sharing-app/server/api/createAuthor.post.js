// ./server/api/createAuthor.post.js

import { sendReq } from "~~/composables/sendReq";
const { manageAPIURL, mainToken } = useRuntimeConfig();

/** 
  * function to create author entry
  *
  * define function parameters with default values

  * @param {string} username Author username
  * @param {string} name Author name
  * @param {Array?} photos Array of Author photos
*/
const createAuthor = async ({ username, name, photos }) => {
  const createAuthorMutation = {
    query: `mutation($authorInput: AuthorInput!){
        createAuthor(data: $authorInput){
          data{
            id
          }
        }
      }`,
    variables: {
      authorInput: {
        username,
        name,
        photos: photos ? photos : [],
      },
    },
  };

  console.log({ createAuthorMutation });

  const res = await sendReq(manageAPIURL, {
    body: JSON.stringify(createAuthorMutation),
    headers: {
      Authorization: `Bearer ${mainToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log("👀 createAuthor", { res });

  return res;
};

/** 
  * function to publish created author entry
  *
  * define function parameters with default values

  * @param {string} id ID of just created author etry
*/
const publishAuthor = async (id) => {
  const publishAuthorMutation = {
    query: `mutation($id: ID!){
      publishAuthor(revision: $id){
        data{
          id
          username
          name
        }
      }
    }`,
    variables: {
      id,
    },
  };

  const res = await sendReq(manageAPIURL, {
    body: JSON.stringify(publishAuthorMutation),
    headers: {
      Authorization: `Bearer ${mainToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log("👀 publishAuthor", { res });

  return res;
};

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    console.log(body);

    // STEP 1
    // Create Author
    const createAuthorRes = await createAuthor(body);
    console.log({ data: JSON.stringify(createAuthorRes) });

    // get id of newly created Author
    const { id } = createAuthorRes.createAuthor.data;

    // STEP 2
    // Publish Author
    const publishAuthorRes = await publishAuthor(id);
    console.log({ data: JSON.stringify(publishAuthorRes) });

    return publishAuthorRes.publishAuthor.data;
  } catch (error) {
    return { statusCode: (event.res.statusCode = 400), message: error };
  }
});

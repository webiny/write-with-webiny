// ./server/api/createPhoto.post.js

import { sendReq } from "~~/composables/sendReq";
const { manageAPIURL, mainToken } = useRuntimeConfig();

/** 
  * function to create photo entry
  *
  * define function parameters with default values

  * @param {string} caption image caption
  * @param {string} url image URL
  * @param {string} authorId Author ID
*/
const createPhoto = async ({ caption, url, authorId }) => {
  const createPhotoMutation = {
    query: `mutation($photoInput: PhotoInput!){
      createPhoto(data: $photoInput){
        data{
          id
          caption
          photo
          author{
            id
          }
        }
      }
    }`,
    variables: {
      photoInput: {
        caption,
        photo: url,
        author: { modelId: "author", id: authorId },
      },
    },
  };

  console.log({ createPhotoMutation });

  const res = await sendReq(manageAPIURL, {
    body: JSON.stringify(createPhotoMutation),
    headers: {
      Authorization: `Bearer ${mainToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log("👀 createPhoto", { res });

  return res;
};

/** 
  * function to publish created photo entry
  *
  * define function parameters with default values

  * @param {string} id ID of just created photo etry
*/
const publishPhoto = async (id) => {
  const publishPhotoMutation = {
    query: `mutation($id: ID!){
      publishPhoto(revision:$id){
        data{
          id
          caption
          photo
          author{
            id
          }
          meta{
            status
            revisions{
              id
            }
          }
        }
      }
    }`,
    variables: {
      id,
    },
  };

  const res = await sendReq(manageAPIURL, {
    body: JSON.stringify(publishPhotoMutation),
    headers: {
      Authorization: `Bearer ${mainToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log("👀 publishPhoto", { res });

  return res;
};

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    console.log({ body });

    // STEP 1
    // Create Photo
    const createPhotoRes = await createPhoto(body);
    console.log({ createPhotoRes: JSON.stringify(createPhotoRes) });

    // get id of newly created photo
    const { id } = createPhotoRes.createPhoto.data;

    // STEP 2
    // Publish Photo
    const publishPhotoRes = await publishPhoto(id);
    console.log({ publishPhotoRes: JSON.stringify(publishPhotoRes) });

    // return published photo
    return publishPhotoRes.publishPhoto.data;
  } catch (error) {
    console.log({ error });
    return { statusCode: (event.res.statusCode = 400), message: error };
  }
});

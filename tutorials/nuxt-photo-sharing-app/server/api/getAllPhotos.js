// ./server/api/getAllPhotos.js

import { sendReq } from "~~/composables/sendReq";

export default defineEventHandler(async (event) => {
  const { readToken, readAPIURL } = useRuntimeConfig().public;

  let photosQuery = {
    query: `{
  listPhotos{
    data{
      id
      caption
      photo
      author{
        id
        name
        username
      }
    }
  }
}`,
  };

  const photos = await sendReq(readAPIURL, {
    body: JSON.stringify(photosQuery),
    headers: {
      Authorization: `Bearer ${readToken}`,
      "Content-Type": "application/json",
    },
  });

  return photos;
});

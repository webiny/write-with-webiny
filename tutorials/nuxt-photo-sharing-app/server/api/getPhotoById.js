// server/api/getPhotoById.js

import { sendReq } from "~~/composables/sendReq";
export default defineEventHandler(async (event) => {
  const { readToken, readAPIURL } = useRuntimeConfig().public;

  const { id } = useQuery(event);

  const photoQuery = {
    query: `query($id: ID){
      getPhoto(where: {id: $id}){
      data{
        caption
        photo
        author{
          name
          username
        }
      }
    }
  }`,
    variables: { id },
  };

  const photo = await sendReq(readAPIURL, {
    body: JSON.stringify(photoQuery),
    headers: {
      Authorization: `Bearer ${readToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log({ photo });

  return photo;
});

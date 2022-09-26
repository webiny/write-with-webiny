// ./server/api/getPresignedPostData.post.js

import { sendReq } from "~~/composables/sendReq";
const { mainToken, mainAPIURL } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { name, type, size } = await useBody(event);
  console.log({ name, type, size });

  const dataQuery = {
    query: `query($data: PreSignedPostPayloadInput!) {
      fileManager {
        getPreSignedPostPayload(data: $data) {
          data {
            data
            file {
              name
              type
              size
              key
            }
          }
        }
      }
    }
  `,
    variables: { data: { name, type, size } },
  };

  console.log({ dataQuery });

  const data = await sendReq(mainAPIURL, {
    body: JSON.stringify(dataQuery),
    headers: {
      Authorization: `Bearer ${mainToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log({ data: JSON.stringify(data) });

  return data ? data : (event.res.statusCode = 400);
});

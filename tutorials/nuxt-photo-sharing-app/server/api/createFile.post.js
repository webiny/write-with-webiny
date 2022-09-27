// ./server/api/createFile.post.js

import { sendReq } from "~~/composables/sendReq";
const { mainAPIURL, mainToken } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { name, key, type, size, tags } = await useBody(event);
  console.log({ name, key, type, size, tags });
  
  const createFileMutation = {
    query: `mutation CreateFile($data: FileInput!) {
      fileManager {
        createFile(data: $data) {
          error {
            code
            message
            data
            __typename
          }
          data {
            __typename
            id
            name
            key
            src
            size
            type
            tags
            createdOn
            createdBy {
              id
              __typename
            }
          }
          __typename
        }
        __typename
      }
    }`,
    variables: {
      data: {
        type,
        name,
        size,
        key,
        tags: tags ? tags : [],
      },
    },
  };

  console.log({ createFileMutation });

  const data = await sendReq(mainAPIURL, {
    body: JSON.stringify(createFileMutation),
    headers: {
      Authorization: `Bearer ${mainToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log({ data: JSON.stringify(data) });

  return data ? data : (event.res.statusCode = 400);
});

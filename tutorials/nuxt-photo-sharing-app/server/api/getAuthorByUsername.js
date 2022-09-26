// ./server/api/getAuthorByUsername.js

import { sendReq } from "~~/composables/sendReq";
export default defineEventHandler(async (event) => {
  const { readToken, readAPIURL } = useRuntimeConfig().public;

  const { username } = useQuery(event);
  console.log({ username });

  const authorQuery = {
    query: `query($username: String!) {
      getAuthor(where: { username: $username }) {
        data {
          id
          name
          username
        }
      }
    }
    `,
    variables: { username },
  };

  const author = await sendReq(readAPIURL, {
    body: JSON.stringify(authorQuery),
    headers: {
      Authorization: `Bearer ${readToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log({ author });

  return author.getAuthor;
});

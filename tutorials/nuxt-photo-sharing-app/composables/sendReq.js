// ./composables/sendReq.js

// function to send requests
// pass GraphQL URL and request options
export const sendReq = async (graphqlURL, opts) => {
  console.log({ graphqlURL, opts });
  try {
    let res = await fetch(graphqlURL, {
      method: "POST",
      // fetch options
      ...opts,
    });
    let result = await res.json();
    console.log({ result, errors: result.error });
    // Handle request errors
    if (result.error) {
      // result.error.forEach((error) => alert(error.message));
      // Throw an error to exit the try block
      throw Error(JSON.stringify(result.error));
    } else if (result.errors) {
      result.errors.forEach((error) => console.log({ error: error.message }));
      // Throw an error to exit the try block
      throw Error(JSON.stringify(result.errors));
    }
    // save result response to page data state
    return result.data;
  } catch (error) {
    console.log("sendReq Error", { error });
    return {
      errors: error,
    };
  }
};

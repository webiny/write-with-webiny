// const { ListPosts } = require('./queries');
// const { GraphQLClient } = require('graphql-request');

// const endpoint = "https://d1hnid7bz3ttlg.cloudfront.net/cms/read/en-US";

// const graphQLClient = new GraphQLClient(endpoint, {
//     headers: {
//       authorization: `Bearer ${process.env.DATOCMS_TOKEN}`,
//     },
//   })

// const getPosts = async () => {
//     try {
//       console.log(graphQLClient)
      
//     } catch (e) {
//       throw new Error('There was a problem getting Post', e);
//     }
//   };
  
//   exports.getPosts = getPosts;

var axios = require('axios');
var data = JSON.stringify({
  query: `{
  listPosts {
    data {
      title
      body
      author{
          name
          authoursBio
      }
    }
  }
}`,
  variables: {}
});

var config = {
  method: 'post',
  url: 'https://d1hnid7bz3ttlg.cloudfront.net/cms/read/en-US',
  headers: {
    'Authorization': 'Bearer accbb28065b320821c499da041ed0bb80f88faab1df8e661',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  data : data
};




const getPosts = async () => {
    try {
      const {data}  = await axios(config) 
      return data && data.data && data.data.listPosts && data.data.listPosts.data ? data.data.listPosts.data : []
    } catch (e) {
      throw new Error('There was a problem getting Post', e);
    }
  };
  
  exports.getPosts = getPosts;

var dotenv = require(dotenv);
var axios = require('axios');
dotenv.config()
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
  url: `${process.env.API_ENDPOINT}`,
  headers: {
    'Authorization': `Bearer ${process.env.WEBINY_TOKEN}`,
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

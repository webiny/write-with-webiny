const { getPosts } = require('./graphql/data');

module.exports = async () => {
  const posts = await getPosts()
  return {
    posts,
  };
};
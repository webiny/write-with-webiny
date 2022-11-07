require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Webiny blog`,
    siteUrl: `https://gatsby-webiny-blog`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `roboto-mono`, // for the codeblocks on our blog
          `muli\:400,400i,700,700i`,
        ],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "Webiny",
        fieldName: "webiny",
        url: process.env.API_URL,
        headers: {
          Authorization: `Bearer ${process.env.WEBINY_API_SECRET}`,
        },
      },
    },
  ],
};

import * as React from "react";
import Header from "../components/Header";
import { graphql } from "gatsby";
import { Seo } from "../components/Seo";
import { BlogPostSection } from "../styles/home.styled";
import Post, { FeaturedPost } from "../components/Post";

const IndexPage = ({ data }) => {
  let posts = data.webiny.listPosts.data;
  const latestPost = posts[0];

  return (
    <React.Fragment>
      <Seo title="Holla Seo" />
      <main style={{ border: "1px solid #fff", height: "100vh" }}>
        <Header />
        <BlogPostSection>
          <FeaturedPost data={latestPost} />
          {posts.slice(1)?.map((items) => {
            return <Post data={items} key={items.id} />;
          })}
        </BlogPostSection>
      </main>
    </React.Fragment>
  );
};

export default IndexPage;

export const posts = graphql`
  query posts {
    webiny {
      listPosts(sort: createdOn_DESC) {
        data {
          id
          slug
          title
          excerpt
          createdOn
          featuredImage
          author {
            name
          }
        }
      }
    }
  }
`;

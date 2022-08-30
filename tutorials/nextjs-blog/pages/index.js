import React from "react";
import Head from "next/head";
import { getArticles } from "../src/utils/helper";
import styled from "styled-components";
import BlogCard from "../src/components/blogCard";
import Header from "../src/components/Header";

export const Container = styled.div`
  .cards {
    padding: 30px 60px;
    display: flex;
    flex-wrap: wrap;
  }
`;

function BlogPage({ posts }) {
  return (
    <React.Fragment>
      <Head>
        <title>Next.js Blog with Webiny CMS</title>
      </Head>
      <Container>
        <Header />
        <div className="cards">
          {posts?.map((post, index) => {
            return <BlogCard data={post} key={index} />;
          })}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default BlogPage;

export async function getStaticProps() {
  let articles = await getArticles();

  const posts = articles;

  return {
    props: {
      posts,
    },
  };
}

import React from "react";
import Head from "next/head";
import Header from "../../src/components/Header";
import styled from "styled-components";
import { getAuthorByName, getAuthorSlugs } from "../../src/utils/helper";

export const AuthorContainer = styled.div`
  .author-intro {
    background: var(--wine);
    height: 520px;
    display: flex;
    padding: 70px 70px;
    justify-content: space-between;

    .author-image {
      background: var(--teal);
      height: 500px;
      width: 40%;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .author-bio {
      padding: 0 20px;
      width: 60%;

      .authors-name {
        font-size: 50px;
        font-weight: 500;
        color: #fff;
      }

      .bio {
        width: 80%;
        font-size: 18px;
        margin-top: 14px;
        color: #fff;
      }
    }
  }
`;

export default function Author({
  author: {
    name,
    picture,
    authorsBio,
  },
}) {
  return (
    <React.Fragment>
      <Head>
        <title>{name} | Webiny CMS Blog</title>
      </Head>
      <AuthorContainer>
        <Header />
        <div className="author-intro">
          <div className="author-image">
            <img src={picture} alt={`${name}'s profile picture`} />
          </div>
          <div className="author-bio">
            <p className="authors-name">{name}</p>
            <p className="bio">{authorsBio}</p>
          </div>
        </div>
        <div className="articles"></div>
      </AuthorContainer>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const authors = await getAuthorSlugs();

  console.log(`author slug: ${authors}`);

  return {
    paths: authors.map((author) => {
      return {
        params: {
          author: author.slug,
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const author = await getAuthorByName(params.author);

  return {
    props: {
      author: {
        ...author,
      },
    },
  };
}

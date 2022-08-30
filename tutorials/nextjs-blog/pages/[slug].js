import React from "react";
import Head from "next/head";
import { getArticleBySlug, getAllPostSlugs } from "../src/utils/helper";
import styled from "styled-components";
import Header from "../src/components/Header";
import dayjs from "dayjs";
import { RichTextRenderer } from "@webiny/react-rich-text-renderer";
import Link from "next/link";

export const PostContainer = styled.section`
  .content {
    padding: 10px 90px;

    .article-title {
      padding: 5px 0;
      font-size: 55px;
    }

    .author-published-date {
      display: flex;
      gap: 16px;
      margin-bottom: 40px;

      .author-name {
        color: var(--wine);

        :hover {
          cursor: pointer;
        }
      }
    }

    h2 {
      font-zise: 40px;
      padding: 14px 0;
    }
  }
`;

export default function Article({
  post: {
    title,
    body,
    createdOn,
    author: { name, slug },
  },
}) {
  return (
    <React.Fragment>
      <Head>
        <title>{title} | Webiny CMS Blog </title>
      </Head>
      <PostContainer>
        <Header />
        <div className="content">
          <h2 className="article-title">{title}</h2>
          <div className="author-published-date">
            <Link href={`/author/${slug}`}>
              <p className="author-name">{name}</p>
            </Link>
            <p>{dayjs(createdOn).format("MMMM, D, YYYY")}</p>
          </div>
          <RichTextRenderer data={body} />
        </div>
      </PostContainer>
    </React.Fragment>
  );
}

// get the slugs from all articles, map them dynamically as routes
export async function getStaticPaths() {
  const articles = await getAllPostSlugs();

  return {
    paths: articles.map((articles) => {
      return {
        params: {
          slug: articles.slug,
        },
      };
    }),
    fallback: true,
  };
}

// fetch and renders the content of the article based
// on the current slug/route dynamically
export async function getStaticProps(context) {
  const { params } = context;

  const article = await getArticleBySlug(params.slug);

  return {
    props: {
      post: {
        ...article,
      },
    },
  };
}

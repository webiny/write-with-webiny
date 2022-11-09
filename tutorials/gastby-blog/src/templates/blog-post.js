import React from "react";
import { RichTextRenderer } from "@webiny/react-rich-text-renderer";
import styled from "styled-components";
import dayjs from "dayjs";
import { Seo } from "../components/Seo";
import { Link } from "gatsby";

const PostWrapper = styled.section`
  padding: var(--blog-pad-desktop);
  padding-top: 20px;
  padding-bottom: 20px;

  .article-info {
    padding: 0 0 30px 0;

    .article-title {
      font-size: 50px;
      font-weight: bold;
    }
  }

  h2 {
    font-size: 30px;
    padding: 5px 0;
  }

  p {
    line-height: 25px;
  }

  @media only screen and (min-width: 0px) and (max-width: 576px) {
    padding: var(--mobile-sm-pad);

    h1 {
      font-size: 30px !important;
      line-height: 35px;
    }
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: var(--mobile-md-pad);

    h1 {
      font-size: 30px !important;
      line-height: 35px;
    }
  }
`;

export default function BlogPost({ pageContext }) {
  const { title, body, createdOn } = pageContext;

  return (
    <React.Fragment>
      <Seo title={title} />
      <PostWrapper>
        <Link to="/" style={{ color: "#000", textDecoration: "none" }}>
          Go back
        </Link>
        <div className="article-info">
          <h1 className="article-title">{title}</h1>
          <p className="article-date">
            {dayjs(createdOn).format("MMMM, DD, YYYY")}
          </p>
        </div>
        <RichTextRenderer data={body} />
      </PostWrapper>
    </React.Fragment>
  );
}

import React from "react";
import "../App.css";

export default function Posts({ news }) {
  return (
    // step5:displaying all data recieve
      <div className="blog-block">
      <img alt="" src={news.coverImage} className="images" />
      <p className="title">{news.title}</p>
      <p>{news.description}</p>
      <span className="article-details">
        <p>{news.publishedAt}</p>
        <p>{news.authors.name}</p>
      </span>
      <a href={news.slug}>Read More</a>
      </div>
  );
}

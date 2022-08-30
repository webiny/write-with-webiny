import React from "react";
import Link from "next/link";
import Image from "next/image";
import propTypes from "prop-types";
import { Card } from "./style/blogcard.styled";
import dayjs from "dayjs";

const BlogCard = ({
  data: {
    slug,
    featuredImage,
    title,
    excerpt,
    author: { name },
    createdOn,
  },
}) => {
  return (
    <Link href={`/${slug}`} passHref>
      <Card>
        <div className="featured-image">
          <Image
            src={featuredImage}
            height={230}
            width={320}
            alt={title}
            placeholder="blur"
            blurDataURL
          />
        </div>
        <div className="card-info">
          <p className="title">{title}</p>
          <p className="description">{excerpt}</p>
          <div className="author-date">
            <p className="date">{dayjs(createdOn).format("MMMM, D, YYYY")} </p>
            <p className="author">{name}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;

BlogCard.propTypes = {
  data: propTypes.array.isRequired,
};

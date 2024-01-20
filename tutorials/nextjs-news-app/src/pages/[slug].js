import React from "react";
import {getNewsBySlug} from "@/lib/api";
import Image from "next/image";
let moment = require("moment");

export default function News({
  title,
  image,
  description,
  author,
  slugUrl,
  createdOn,
}) {
  return (
    <div className="md:px-60 md:py-30 p-20">
      <h1 className="text-center text-3xl md:text-5xl font-bold ">{title}</h1>
      <div className="flex justify-center py-10">
        <p className="text-blue-500 capitalize">By {author}</p>,{" "}
        <p className="ml-2 text-gray-500">
          {moment(createdOn).format("MMMM, D, YYYY")}
        </p>
      </div>
      <div className="mt-3 mb-10 flex justify-center">
        <Image
          src={image}
          height={400}
          width={1000}
          alt={slugUrl}
          className="rounded object-cover h-[30rem] w-[55rem] text-center"
          priority
          unoptimized
        />
      </div>
      <div className="text-gray-500">{description}</div>
    </div>
  );
}

// get and populate news post data
export const getServerSideProps = async (context) => {
  console.log("slug", context.query.slug);
  const newsPost = await getNewsBySlug(context.query.slug);
  console.log("newsposts", newsPost);

  return {
    props: {
      ...newsPost,
    },
  };
};

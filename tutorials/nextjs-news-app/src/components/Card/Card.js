"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
let moment = require("moment");

export default function NewsCard({cardData}) {
  return (
    <Link href={`/${cardData.slugUrl}`} passHref>
      <div className="hover:scale-105 hover:transition-transform">
        <Image
          src={cardData.image}
          height={200}
          width={600}
          alt={cardData.slugUrl}
          className="rounded object-cover h-[14rem] w-[30rem]"
          priority
          unoptimized
        />
        <div className="mt-3 mb-3">
          <h1 className="font-bold text-[18px] text-blue-500 capitalize mb-3">
            {cardData.title}
          </h1>
          <h2 className="text-gray-500 text-[14px]">{cardData.excerpt}</h2>
          <div className="mt-3">
            <span className="text-blue-400 capitalize text-[14px]">
              {cardData.author}
            </span>
            ,
            <span className="text-blue-400 capitalize text-[14px] ml-2">
              {moment(cardData.createdOn).format("dddd, MMMM Do YYYY")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

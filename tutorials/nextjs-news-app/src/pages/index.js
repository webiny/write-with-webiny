// "use client";
import {useEffect, useState} from "react";
import NewsCard from "../components/Card/Card";
import {getAllNews} from "../lib/api";
import axiosClient, {url, addNews} from "@/lib/axiosApi";
export default function Home({allNews}) {
  const [news, setNews] = useState(allNews);
  const [data, setData] = useState();

  useEffect(() => {
    axiosClient({
      url,
      method: "GET",
    })
      .then((response) => {
        console.clear();
        setData(response.data);
        response.data?.articles?.map((item) => {
          // addNews(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="md:w-[1000px] mx-auto">
      <p className="text-[20px] p-10">
        A news app is a powerful tool that allows users to stay updated with the
        latest news and information from around the world. With the rapid
        advancement of technology, news apps have become an essential part of
        our daily lives, providing instant access to news articles, videos, and
        other multimedia content . Get the latest news anywhere at any time.
      </p>

      <div className="p-10 grid sm:grid-cols-2 gap-10 grid-cols-1">
        {news.length > 0 ? (
          news.map((newspost, index) => (
            <div key={index}>
              <NewsCard cardData={newspost} />
            </div>
          ))
        ) : (
          <p>There are news to display today...</p>
        )}
      </div>
    </main>
  );
}

// gett all news posts
export async function getServerSideProps() {
  let allNews = await getAllNews();
  return {
    props: {allNews},
  };
}

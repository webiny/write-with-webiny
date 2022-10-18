import { useState, useEffect } from "react";
import "./App.css";
import Posts from "./components/Posts";
import {MdRecordVoiceOver} from 'react-icons/md'
import alanBtn from "@alan-ai/alan-sdk-web";
import { useQuery, gql } from "@apollo/client";

function App() {
  const [input, setInput] = useState("");
  let alanKey = "924f4ab512371150076a72f0ba54f7832e956eca572e1d8b807a3e2338fdd0dc/stage"

  useEffect(() => {
    alanBtn({
      key: alanKey ,
      onCommand: ({ command, author }) => {
        if (command === "open") {
          setInput(author);
        }
      },
    });
  }, []);

  useEffect(() => {
    data?.listPosts?.data?.map((data) => {
      if (data.authors.name === input) {
        window.open(data.slug, "_blank");
      }
    });
  }, [input]);

  // add a query list
  const GET_NEWS = gql`
    query {
      listPosts {
        data {
          coverImage
          title
          description
          publishedAt
          slug
          authors {
            name
          }
        }
      }
    }
  `;

  // step3: Add instances for the data
  const { loading, error, data } = useQuery(GET_NEWS);
  if (loading) return <p className="container">Getting all news...</p>;
  if (error) return <p className="container">An error occurred:(</p>;

  return (
    <div className="container">
      <h1>Voice News <MdRecordVoiceOver className="icon"/></h1>
      <div className="wrapper">
      {/* mapping through the data and sending to the component file */}
      
      {data?.listPosts?.data?.map((data) => {
        return (
          <div className="wrapper">
            <Posts news={data} />
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default App;
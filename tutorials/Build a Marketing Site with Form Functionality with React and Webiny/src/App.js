import { React, useState } from "react";
import About from "./components/About";
// import { useQuery, gql, useMutation } from "@apollo/client";
import Landing from "./components/Landing";
import Works from "./components/Works";
import Form from "./components/Form";

function App() {
  return (
    <div className="bg-[#fff7f1] ">
      <Landing />
      <About />
      <Works />
      <Form />
    </div>
  );
}
export default App;

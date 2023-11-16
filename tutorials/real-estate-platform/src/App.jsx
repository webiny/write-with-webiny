// import FlatsPage from "./Pages/FlatPage/Flat"
// import {useState} from "react";
import Home from "./Pages/HomePage/Home.jsx";
import FlatPage from "./Pages/FlatPage/Flat.jsx";
import LuxuryPage from "./Pages/LuxuryPage/Lux.jsx";
// import { useQuery, gql } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/flats-section",
      element: <FlatPage />,
    },
    {
      path: "/luxury-section",
      element: <LuxuryPage />,
    },
  ]);
  return (
      <RouterProvider router={router} />
  );
}

export default App;

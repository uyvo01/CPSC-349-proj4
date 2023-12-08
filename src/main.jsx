import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";


import ErrorPage from "./error-page";

import Home from "./routes/home";


import SignIn, {
  action as checkUser,
} from "./routes/signin";


import SignUp, {
  action as addUser,
} from "./routes/signup";


import PlayList, {
  getPlaylist as listLoader,
  removeList as removeList,
} from "./routes/playlist";

import List, {
  action as addList,
} from "./routes/list";

import Song, {
  loader as loader,
  action as addSong,
} from "./routes/song";

import Songs, {
  loader as songLoader,
} from "./routes/songs";

import Index from "./routes/index";
import AboutUs from "./routes/aboutus";

const router = createBrowserRouter([
  { home: true, element: <Home /> },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signin",
    element: <SignIn />,
    action: checkUser,
    errorElement: 
    <>
      <SignIn />
      <div className="invalid">Invalid Username or Password!</div>
    </>,
  },
  {
    path: "signup",
    element: <SignUp />,
    action: addUser,
    errorElement: 
    <>
      <SignUp />
      <div className="invalid">Email or username exists!</div>
    </>,
  },
  {
    path: "index",
    element: <Index />,
  },
  {
    path: "aboutus",
    element: <AboutUs />,
  },
  {
    path: "playlist/:user",
    element: <PlayList />,
    loader: listLoader,
    action: removeList,
    children: [
      {
        path: "songs/:song",
        element: <Songs />,
        loader: songLoader,
        children :[
          {
            path: "song",
            element: <Song />,
            loader: loader,
            action: addSong,
          },
        ]
      },
      {
        path: "list",
        element: <List />,
        action: addList,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);

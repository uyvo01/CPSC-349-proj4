import {
  Outlet,
  Form,
  NavLink,
  useLoaderData,
  redirect,
} from "react-router-dom";

import { useState } from 'react';

import Header from "./headersignin";
import Footer from "./footerlogin";

import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:8090/')

export async function getPlaylist({params }) {

    // get full name of the user
    const _name = await pb.collection('users').getFirstListItem('username="'+params.user+'"', {
      expand: 'name',
    });
    // get playlist belong to the user
    const playlist = await pb.collection('playlist').getList(1, 50, {
      filter: 'username="'+params.user+'"',
    });
  return { playlist, _name };
}

export async function removeList({params }) {
  let _url = window.location.pathname;
  let listno=_url.substring(_url.lastIndexOf("/")+1,_url.length);
  // get the list id
  const record = await pb.collection('playlist').getFirstListItem('listno="'+listno+'"', {
    expand: 'id',
  });
  // delete
  await pb.collection('playlist').delete(record.id);
  return redirect("", { relative: "path" });
}

export default function PlayList() {
  const { playlist, _name, params } = useLoaderData();
  const [xList, setxList] =useState("0");

  return (
      <>
      <div>
        <Header />
        <div className="header">{_name.name}'s Playlist</div>
        <div className="container">
        <div id = "sidebar">
          <nav>
          {playlist.items.length ? (
              <ul>
                {playlist.items.map((list) => (
                  <li key={list.listno}>
                    <NavLink
                    to={`songs/${list.listno}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                    >
                      {list.name ? (
                        <>
                          <img src="/src/routes/folder.png" width="25" height="25" />
                          {list.name}                   
                        </>
                      ) : (
                        <i>{list.name}</i>
                      )}
                      </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>Empty</i>
              </p>
            )}

              <NavLink
                to={`list`}
              >
                <button type="button">Add list</button>
              </NavLink>
              <Form method="post" id="delete-list"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "Please confirm you want to delete this list."
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
                <p>
                  <button type="submit">Remove </button>
                </p>
              </Form>
          </nav>

        </div>
        <div id="detail">
          <Outlet />
        </div>
        </div>
        <Footer />
        </div>
      </>
    );
  }
import {
  Form,
  Outlet,
  NavLink,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { useState } from 'react';

import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:8090/')

import ReactAudioPlayer from 'react-audio-player';


export async function loader({ params }) {
  
    // get songs belong to the list
    const _listname = await pb.collection('playlist').getList(1, 50, {
      filter: 'listno="'+params.song+'"',
    });

    // get songs belong to the list
    const songs = await pb.collection('song').getList(1, 50, {
      filter: 'listno="'+params.song+'"', sort:'+songno'
    });

    let _song="";
    if (songs.items.length>1){
      _song = songs.items[0].url;
    }
    
  return { songs, _listname, _song};
}

export default function Songs() {
  const { songs, _listname, _song } = useLoaderData();
  const [xSong, setxSong] =useState("0");
  const [xName,setxName] = useState("");

  function handleClick(_url,_name){
    setxSong(_url);
    setxName(_name);
  }

  function moveNext(_url,_name){
    let x = Math.floor(Math.random() * songs.items.length);
    setxSong(songs.items[x].url);
    setxName(songs.items[x].name);
  }

  return (
    <>
  
    <div id = "sidebar">
      <div className="list">{xName}</div>
      
      <div>
        <ReactAudioPlayer       
          src={xSong}
          autoPlay
          controls={true}
          volume={1}
          preload="metadata"
          onEnded={()=>moveNext(xSong,xName)}
          />
      </div>
      <div className="container">
          <div>
          {songs.items.length ? (
              <ul> 
                {songs.items.map((song) => (
                  <li key={song.id} onDoubleClick={() => handleClick(song.url,song.name)}>
                      {song.name}
                  </li>
                ))}
                <p></p>
              </ul>
            ) : (
              <p>
                <i>Empty</i>
              </p>
            )}
            <NavLink
              to={`song`}
            >
              <button type="submit">Add song</button>
            </NavLink>
          </div>
          <div id="detail">
            <Outlet />
          </div>
      </div>
      </div>
      </>
    );
  }
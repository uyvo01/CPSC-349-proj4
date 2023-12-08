import {
  Form,
  NavLink,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:8090/')

export async function loader({params }) {

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

export async function action({ request, params }) {

  const formData = await request.formData();
    const _song = Object.fromEntries(formData);
    let _url=_song.url.replaceAll(" ","%20")
    let _currenturl = window.location.pathname;
    let listno=_currenturl.substring(0,_currenturl.length-5)
    listno=listno.substring(listno.lastIndexOf("/")+1,listno.length);
    console.log(listno);

    const _songs = await pb.collection('song').getFullList({
      sort: '-songno',
     });
     let maxNum=parseInt(_songs[0].songno)+1;

     let _songno=maxNum.toString();
     _songno=_songno.padStart("5","0");

    // create data
    const data = {
        "songno":_songno,
        "name": _song.name,
        "listno": listno,
        "url": _url
    };
    const record = await pb.collection('song').create(data);
    return redirect("..", { relative: "path" });
}

export default function AddSong() {
  return (
    <div className="addsong"> 
      <div className="title">Add Song</div>
      <Form method="post" id="signup-form">
      
      <p>
          <input
            placeholder="Song name*"
            aria-label="name"
            type="text"
            name="name"
          />
        </p>
        <p>
          <input
            placeholder="url*"
            aria-label="url"
            type="text"
            name="url"
          />
        </p>
       
        <p>
          <button type="submit">Save</button>
        </p>
      </Form>
    </div>
  );
}
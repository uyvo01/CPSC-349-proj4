import {
  Form,
  NavLink,
  useLoaderData,
  redirect,
} from "react-router-dom";


import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:8090/')

export async function action({ request, params }) {

  const formData = await request.formData();
  const _list = Object.fromEntries(formData);
  const _playlist = await pb.collection('playlist').getFullList({
    sort: '-listno',
   });
   console.log(_playlist);
  let maxNum= parseInt(_playlist[0].listno)+1;
  let _listno=maxNum.toString();
  _listno=_listno.padStart("5","0");
  // create data
  const data = {
    "username": params.user,
    "name": _list.name,
    "listno": _listno
  };

  const record = await pb.collection('playlist').create(data);

  return redirect("..", { relative: "path" });
}

export default function AddList() {
  return (
    <center>
      <h1>Add Playlist</h1>
      <Form method="post" id="signup-form">
      <p>
          <input
            placeholder="List name*"
            aria-label="name"
            type="text"
            name="name"
          />
        </p>
       
        <p>
          <button type="submit">Save</button>
        </p>
      </Form>
    </center>
  );
}
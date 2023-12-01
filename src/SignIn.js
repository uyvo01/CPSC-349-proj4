import * as React from 'react';
import TextField from "./TextField";
import Button from "./Button";

const USERNAME = 'uyvo01@gmail.com'
const PASSWORD = 'thanhuy1234'
import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:8090/')

const authData = await pb.admins.authWithPassword(USERNAME, PASSWORD)
console.log(authData)

// you can also fetch all records at once via getFullList
const records = await pb.collection('users').getFullList({
  sort: '+created',
});

export default function SignIn() {

  return (
     <>
      <center>
        <h1>Sign In</h1>
          <TextField text ={'Email Address*'} size ={30} onclick/>
          <TextField text ={'Password*'} size ={30}/>
          <Button value={'Sign In'} />
          <hr />
          <h2>User List</h2>
          <h3>1. Name: {records[0].name}</h3>
          <h3>2. Name: {records[1].name}</h3>
          <h3>2. Name: {records[2].name}</h3>
      </center>
    </>
  );
}
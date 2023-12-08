import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
//import { getContacts, createContact } from "../contacts";

import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:8090/')
const ADMINNAME = 'uyvo01@gmail.com'
const ADMINPASSWORD = 'thanhuy1234'

const authData = await pb.admins.authWithPassword(ADMINNAME, ADMINPASSWORD)
console.log(authData)
const users = await pb.collection('users').getFullList({
  sort: '-created',
});
console.log(users);

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader() {
  
  const authData = pb.admins.authWithPassword(ADMINNAME, ADMINPASSWORD)
  console.log(authData)
  const users = await pb.collection('users').getFullList({
    sort: '-created',
  });
  console.log(users);
  const contacts = await getContacts();
  return { contacts };
}

export default function User() {
  const { contacts } = useLoaderData();
  console.log(contacts);

  return (
    <>
      <div id = "user">
        <nav>
        {users.length ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                    {user.email ? (
                      <>
                        {user.email}
                      </>
                    ) : (
                      <i>{user.email}</i>
                    )}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
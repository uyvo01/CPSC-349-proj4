import {
  Form,
  NavLink,
  useLoaderData,
  redirect,
} from "react-router-dom";
import Header from "./headerlogin";
import Footer from "./footerlogin";

import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:8090/')

export async function action({ request, params }) {
    const formData = await request.formData();
    const _user = Object.fromEntries(formData);
    console.log(_user);
    const _username = _user.user;
    const _pass = _user.pass;
    
    // Returns new auth token and account data
    const authData = await pb.collection('users').authWithPassword(_username,_pass,);
    console.log(authData);
    return redirect(`../playlist/${_username}`);
}

export default function SignIn() {
  return (
    <center>
      <div>
        <Header />
      </div>
      <h1>Sign In</h1>
      <Form method="post" id="signin-form">
        <p>
          <input
            placeholder="username"
            aria-label="username"
            type="text"
            name="user"
          />
        </p>
          <input
            placeholder="password"
            aria-label="password"
            type="password"
            name="pass"
          />
        <p>
          <button type="submit">Sign in</button>
          <NavLink to={`../signup`}><button type="button">Sign up</button></NavLink>
        </p>
      </Form>
      <div>
        <Footer />
      </div>
    </center>
  );
}
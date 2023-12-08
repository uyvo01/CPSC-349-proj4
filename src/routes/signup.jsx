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
    
    const data = {
        "username": _user.user,
        "email": _user.email,
        "emailVisibility": true,
        "password": _user.pass,
        "passwordConfirm": _user.confirm,
        "name": _user.name
    };
    console.log(data);
    const record = await pb.collection('users').create(data);
    
    // (optional) send an email verification request
    await pb.collection('users').requestVerification(_user.email);

    return redirect(`../playlist/${_user.user}`);
}

export default function SignUp() {
  return (
    <center>
      <div>
        <Header />
      </div>
      <h1>Sign Up</h1>
      <Form method="post" id="signup-form">
      <p>
          <input
            placeholder="full name*"
            aria-label="name"
            type="text"
            name="name"
          />
        </p>
        <p>
          <input
            placeholder="email*"
            aria-label="email"
            type="text"
            name="email"
          />
        </p>
        <p>
          <input
            placeholder="username*"
            aria-label="username"
            type="text"
            name="user"
          />
        </p>

        <p>
          <input
            placeholder="password*"
            aria-label="password"
            type="password"
            name="pass"
          />
        </p>
        <p>
          <input
            placeholder="confirm*"
            aria-label="confirm"
            type="password"
            name="confirm"
          />
        </p>
        <p>
          <button type="submit">Sign up</button>
        </p>
      </Form>

      <div>
        <Footer />
      </div>
    </center>
  );
}
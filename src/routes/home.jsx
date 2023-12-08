import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
//import { getContacts, createContact } from "../contacts";
import Header from "./header";
import Index from "./index";
import Footer from "./footer";


export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader(params) {
  
}

export default function Home() {
  return (
    <>

    <div>
      <Index />
    </div>


    </>
  );
}
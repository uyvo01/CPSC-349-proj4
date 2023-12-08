import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";

export default function Header() {
  return (
      <>
        <div>
          <div>
          <NavLink
            to={`index`}
          >Home
          </NavLink>
        </div>
        <div>
          <NavLink
            to={`aboutus`}
          >About us
          </NavLink>
        </div>
        <div>
          <NavLink
            to={`signin`}
          >Login
          </NavLink>
        </div>
        </div>
        <hr />
        <br />
      </>
      
  );
}
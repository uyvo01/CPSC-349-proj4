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
      <div className="menu">
        <div className="container">
          <div>
          <NavLink
            to={`../index`}
          >Home
          </NavLink>
          </div>
          <div>
            <NavLink
              to={`../aboutus`}
            >About us
            </NavLink>
          </div>

          <div>
            <NavLink
              to={`../index`}
            >Logout
            </NavLink>
          </div>
        </div>
      </div>
      <hr />
      <br />
    </>
      
  );
}
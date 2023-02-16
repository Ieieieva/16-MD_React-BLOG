import { Outlet, NavLink } from "react-router-dom";
import './Layout.css'

export const Layout = () => {
  return (
    <>
      <nav>
        <ul className="nav_list">
          <li>
            <NavLink 
              to="/"
              className="nav__item"
              >
                Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/blogs"
              className="nav__item"
              >
                Blogs
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
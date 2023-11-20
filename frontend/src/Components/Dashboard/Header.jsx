import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMenuOpen(false);
  };
  const history = useNavigate();
  async function handleLogout() {
    try {
      await logout()
      localStorage.removeItem("userAvatar");
      history("/login")
    } catch {
      console.log("Failed to logout")
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      setIsOpen(false);
      setIsMenuOpen(false);
    };
  }, []);

  const [randomAvatar] = useState(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    return storedAvatar || getDefaultAvatar();
  });

  useEffect(() => {
    localStorage.setItem("userAvatar", randomAvatar);
  }, [randomAvatar]);

  function getDefaultAvatar() {
    const generateRandomString = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const randomString = Array.from({ length: 10 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
      return randomString;
    };
    const randomString = generateRandomString();
    return `https://robohash.org/${randomString}.png`;
  }


  return (
    <>
      <nav className="bg-white z-50 fixed w-full border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 md:px-20">
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src="/assets/acess_logo.webp"
              className="h-12 pb-2"
              loading="lazy"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              cess8
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={handleToggle}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-10 h-10 rounded-full"
                src={randomAvatar}
                loading="lazy"
                alt=""
              />
            </button>

            {isOpen &&
              <div
                className="z-50 absolute top-14 right-1 lg:right-3 my-4 mr-3 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {currentUser.displayName}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {currentUser.email}
                  </span>
                </div>
                <ul className="p-4" aria-labelledby="user-menu-button">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-blue-500 hover:bg-blue-600 duration-75 text-white p-2 rounded-md w-full text-center"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            }

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {isMenuOpen && <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <MenuLinks to="/dashboard">Home</MenuLinks>
              <MenuLinks to="/dashboard/dbabout">About</MenuLinks>
              <MenuLinks to="/dbservices">Services</MenuLinks>
              <MenuLinks to="/dashboard/dbcontact">Contact</MenuLinks>
            </ul>
          </div>}
          <div
            className="items-center hidden justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <CustomLink to="/dashboard">Home</CustomLink>
              <CustomLink to="/dashboard/dbabout">About</CustomLink>
              <CustomLink to="/dbservices">Services</CustomLink>
              <CustomLink to="/dashboard/dbcontact">Contact</CustomLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

function MenuLinks({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className="mb-4">
      <Link
        to={to} {...props}
        className={isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}
      >
        {children}
      </Link>
    </li>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname });
  return (
    <li>
      <Link
        to={to} {...props}
        className={isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}
      >
        {children}
      </Link>
    </li>
  );
}

export default Header;

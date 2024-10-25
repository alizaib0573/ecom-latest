import React, { useState, useContext, useEffect } from "react";
import "../assets/Main.css";
import SearchIcon from "../assets/images/Search.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../App'; // Import the context

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { name, setname, setToken, setEmail } = useContext(AuthContext); // Access context values
  const navigate = useNavigate(); // Navigation

  // State to manage the signup type
  const [signupType, setSignupType] = useState(null);

  // Retrieve the signupType from localStorage when the component mounts
  useEffect(() => {
    const storedSignupType = localStorage.getItem("signupType");
    setSignupType(storedSignupType);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear the stored user data
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('signupType'); // Remove signupType on logout

    // Reset the context values
    setToken(null);
    setname(null);
    setEmail(null);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <nav className="2xl:px-12">
        <div className="container mx-auto">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                <button
                  onClick={toggleMobileMenu}
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                  <svg
                    className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center logo">
                  <span className="lg:px-0 md:px-0 sm:px-0 px-2">LOGO</span>
                </div>
                <div className="hidden sm:ml-6 sm:block"></div>
                <div className="search relative lg:block hidden">
                  <input type="search" placeholder="Which product are you looking for?" className="border" />
                  <span>
                    <img src={SearchIcon} alt="" style={{ position: "absolute", top: '6px', right: '12px' }} />
                  </span>
                </div>
              </div>
              <div className="absolute inset-y-0 lg:block hidden 0-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 nav-links">
                <div className="flex space-x-4">
                  <a href="#" className="rounded-md px-3 py-2" aria-current="page">
                    Search Product
                  </a>
                  <a href="#" className="rounded-md px-3 py-2 text-sm font-medium">
                    Event/Notification
                  </a>
                  <NavLink to="/campion" className="rounded-md px-3 py-2 text-sm font-medium">
                    How to use
                  </NavLink>
                  
                  {name ? (
                    <>
                      <button className="font-medium Login w-100">
                        <span onClick={handleLogout}>Logout</span>
                      </button>

                      {/* Conditionally show the Register button if the user logged in through SignUp2 */}
                      {signupType === "SignUp2" && (
                        <Link to="/add/campian" className="Login">
                          Register
                        </Link>
                      )}
                    </>
                  ) : (
                    <NavLink to={name ? '' : "login"} className="font-medium Login w-100">
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menus */}
          <div className={`${isMobileMenuOpen ? "block" : "hidden"} lg:hidden nav-links`} id="mobile-menu">
            <div className="space-y-1 px-2 pb-3">
              <a href="#" className="block rounded-md px-3 py-2" aria-current="page">
                Search Product
              </a>
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium">
                Event/Notification
              </a>
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium">
                How to use
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

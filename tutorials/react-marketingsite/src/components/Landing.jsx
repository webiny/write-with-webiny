import { React, useState } from "react";
import landingimg from "./landing.jpg";
const Landing = () => {
  const [open, isOpen] = useState(false);
  return (
    <div>
      {/* Navigation Section*/}
      <nav>
        <div className=" backdrop-blur-0 bg-[#fff7f1] md:bg-transparent md:backdrop-blur-md w-full px-[50px] md:px-[40px] lg:px-[60px] z-10 fixed top-0">
          <span className=" pt-[10px] flex justify-between items-center">
            {/* navigation menu component */}
            <a
              href="#home"
              className=" flex justify-center items-center w-max hover:cursor-pointer"
            >
              {/* hero container */}
              <p className="hover:text-blue-400 ml-3 text-[15px] md:text-[18px] font-bold ">
                Markit Agency
              </p>
            </a>
            {/* Nav options */}
            <ul className=" gap-[20px] hidden md:flex md:items-center">
              <a
                href="#about"
                className={`hover:cursor-pointer hover:text-blue-400 text-[13px]`}
              >
                About Us
              </a>
              <a
                href="#work"
                className={`hover:cursor-pointer hover:text-blue-400 text-[13px]`}
              >
                Work
              </a>
              <a
                href="#contact"
                className={`hover:cursor-pointer text-white text-[13px] bg-blue-400 px-3 py-1 rounded-sm`}
              >
                Contact us
              </a>
            </ul>
            {/* Navigation Section dor smaller devices*/}
            <span className=" flex md:hidden">
              <button
                onClick={() => {
                  isOpen(!open);
                }}
                className="kgb inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:opacity-80 outline-none focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                arial-aria-controls="mobile-menu"
                arial-aria-expanded="false"
              >
                {/* Hamburger icon for small screens*/}
                <span className=" sr-only">Main menu</span>
                {!open ? (
                  <svg
                    className=" block h-6 w-6"
                    xmlns="http:www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    arial-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className=" block h-6 w-6"
                    xmlns="http:www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    arial-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </span>
          </span>
          {/* Navigation Section for small screens*/}
          {open ? (
            <nav className=" md:hidden id=mobile-menu">
              <ul className="bg-[#fff7f1] opacity-90 px-2 pt-2 pb-3 space-y-1 sm:px-3 flex justify-center items-end flex-col">
                <a
                  href="#about"
                  className={`cursor-pointer text-blue-500 block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => {
                    isOpen(!open);
                  }}
                >
                  About Us
                </a>
                <a
                  href="#work"
                  className="cursor-pointer text-blue-500 transition-all block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => {
                    isOpen(!open);
                  }}
                >
                  Work
                </a>
                <a
                  href="#contact"
                  className="cursor-pointer text-black transition-all block px-3 py-2 rounded-md text-base font-medium hover:text-white text-[13px] bg-blue-400 "
                  onClick={() => {
                    isOpen(!open);
                  }}
                >
                  Get in touch
                </a>
              </ul>
            </nav>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
      {/* Landing Section*/}
      <div
        className=" h-screen flex justify-center items-center flex-col md:flex-row "
        id="home"
      >
        <div className=" w-full md:w-1/2 pl-6 ">
          {/* left section */}
          <h1 className=" font-bold text-3xl mb-6 ">
            Grow with A Digital
            <br />
            Marketing Agency You
            <br /> Can Trust?
          </h1>
          <p className=" text-[12px] text-slate-600 mb-6">
            Choose Markit Agency as your digital marketing agency and propel you
            <br />
            business to greater heights with our award-winning marketing
            <br /> innovations and technologies.
          </p>
          <a
            href="#contact"
            className=" text-[14px] bg-blue-500 px-3 py-1 rounded-sm hover:cursor-pointer text-white font-medium "
          >
            Get in Touch
          </a>
        </div>
        <div className="  mt-3 md:mt-0 w-full md:w-1/2">
          {/* right section */}
          <img src={landingimg} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Landing;

import React from "react";
import Link from "next/link";

const Topbar = () => {
  return (
    <>
      <div className="flex p-2 bg-sky-700 items-center h-[7vh]">
        <div className="mx-0 ">
          <Link href="/">
            <h1 className="cursor-pointer text-sky-200 text-xl flex items-center font-sans italic">
              <svg
                className="fill-current h-8 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
              >
                <path d="M41 4H9C6.24 4 4 6.24 4 9v32c0 2.76 2.24 5 5 5h32c2.76 0 5-2.24 5-5V9c0-2.76-2.24-5-5-5zM21 36c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v24zm19-12c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v12z" />
              </svg>
              Trello
            </h1>
          </Link>
        </div>
        <div className="flex">
          <nav>
            <ul>
              <li>
                <Link href="/boards">
                  <div className="cursor-pointer ml-2 px-3 py-1 text-white rounded bg-sky-500 bg-opacity-75 hover:bg-sky-600">
                    Boards
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Topbar;

import React from "react";
// Imports for fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPerson,
  faCircle,
  faClipboardUser,
} from "@fortawesome/free-solid-svg-icons";

const Works = () => {
  return (
    <div
      className=" bg-blue-200 min-h-screen flex flex-col justify-center items-center"
      id="work"
    >
      {/* Works section */}
      <h1 className=" text-center mt-12 mb-8 font-bold text-2xl ">
        What We Do?
      </h1>
      <div className=" grid grid-cols-1  px-5 md:px-0 md:grid-cols-2 gap-8 my-10 ">
        <div className=" bg-blue-500 rounded-md px-10 py-5 text-white max-w-[400px] ">
          <div className=" p-2 rounded-full bg-black w-8 h-8 flex justify-center items-center mb-4 ">
            {/* icon container */}
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <h1 className=" font-semibold text-2xl mb-2 ">
            Research and Discovery
          </h1>
          <p className=" text-[10px] text-black mb-6">
            Carry out market research and survey using our numerous tools. Make
            use of our web analytics and data for your research purpose.
            <br />
            Stand out among your peer marketers, use our logistic data to boost
            your business presence.
          </p>
          <a
            href="#contact"
            className=" text-[12px] underline rounded-sm hover:cursor-pointer text-slate-300 font-medium "
          >
            Learn More
          </a>
        </div>
        <div className=" bg-blue-500 rounded-md px-10 py-5 text-white max-w-[400px] ">
          <div className=" p-2 rounded-full bg-black w-8 h-8 flex justify-center items-center mb-4 ">
            {/* icon container */}
            <FontAwesomeIcon icon={faCircle} />
          </div>
          <h1 className=" font-semibold text-2xl mb-2 ">Marketing Strategy</h1>
          <p className=" text-[10px] text-black mb-6">
            Carry out market research and survey using our numerous tools. Make
            use of our web analytics and data for your research purpose.
            <br />
            Stand out among your peer marketers, use our logistic data to boost
            your business presence.
          </p>
          <a
            href="#contact"
            className=" text-[12px] underline rounded-sm hover:cursor-pointer text-slate-300 font-medium "
          >
            Learn More
          </a>
        </div>
        <div className=" bg-blue-500 rounded-md px-10 py-5 text-white max-w-[400px] ">
          <div className=" p-2 rounded-full bg-black w-8 h-8 flex justify-center items-center mb-4 ">
            {/* icon container */}
            <FontAwesomeIcon icon={faClipboardUser} />
          </div>
          <h1 className=" font-semibold text-2xl mb-2 ">Project Management</h1>
          <p className=" text-[10px] text-black mb-6">
            Carry out market research and survey using our numerous tools. Make
            use of our web analytics and data for your research purpose.
            <br />
            Stand out among your peer marketers, use our logistic data to boost
            your business presence.
          </p>
          <a
            href="#contact"
            className=" text-[12px] underline rounded-sm hover:cursor-pointer text-slate-300 font-medium "
          >
            Learn More
          </a>
        </div>
        <div className=" bg-blue-500 rounded-md px-10 py-5 text-white max-w-[400px] ">
          <div className=" p-2 rounded-full bg-black w-8 h-8 flex justify-center items-center mb-4 ">
            {/* icon container */}
            <FontAwesomeIcon icon={faPerson} />
          </div>
          <h1 className=" font-semibold text-2xl mb-2 ">
            Consultant Specialist
          </h1>
          <p className=" text-[10px] text-black mb-6">
            Carry out market research and survey using our numerous tools. Make
            use of our web analytics and data for your research purpose.
            <br />
            Stand out among your peer marketers, use our logistic data to boost
            your business presence.
          </p>
          <a
            href="#contact"
            className=" text-[12px] underline rounded-sm hover:cursor-pointer text-slate-300 font-medium "
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};
export default Works;

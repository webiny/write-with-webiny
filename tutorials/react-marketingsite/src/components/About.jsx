import React from "react";
import aboutimg from "./aboutimg.jpg";
const About = () => {
  return (
    <div
      className=" h-screen flex justify-center items-center flex-col-reverse md:flex-row-reverse"
      id="about"
    >
      <div className=" w-full md:w-1/2 pl-10 ">
        {/* left section */}
        <h1 className=" font-semibold text-3xl mb-6 ">
          Work With Us,
          <br />
          Not For Us.
        </h1>
        <p className=" text-[12px] text-slate-600 mb-6">
          There are hundreds of definition to marketing out there.
          <br />
          But we here at Markit understand that marketing is what happens
          <br />
          in every company: finding new solutions to customer needs and
          launching new products.
        </p>
        <a
          href="#contact"
          className=" text-[14px] underline rounded-sm hover:cursor-pointer text-slate-300 font-medium "
        >
          Learn More
        </a>
      </div>
      <div className="  mb-3 md:mb-0 w-4/5 md:w-1/2 relative">
        {/* right section */}
        <img src={aboutimg} className="rounded-md ml-3" alt="" />
        <div className=" absolute bottom-[-30px] left-[50%] rotate-45 translate-x-[-50%] h-16 w-16 rounded-[8px] bg-blue-200"></div>
      </div>
    </div>
  );
};
export default About;

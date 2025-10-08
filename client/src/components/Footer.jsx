import React from "react";
const Footer = () => {
  return (
    <footer className="flex justify-center mt-8 mb-8">
      <div className="w-11/12 md:w-7/12 bg-gray-600 text-white rounded-xl border-2 border-red-500 px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-3xl md:text-2xl font-extrabold text-red-500 mr-3 font-poppins">
            ShowUP
          </h1>
        </div>
        <p className="text-xl md:text-lg font-bold text-center md:text-left font-poppins">
          Endless Entertainment Anytime. Anywhere!
        </p>
      </div>
    </footer>
  );
};

export default Footer;

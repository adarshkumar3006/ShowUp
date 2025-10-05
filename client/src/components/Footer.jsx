import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center mt-6 mb-6">
      <div className="w-9/12 md:w-5/12 bg-gray-600 text-white rounded-xl border-2 border-red-500 px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* Logo / Site Name */}
        <div className="flex items-center mb-3 md:mb-0">
          <h1 className="text-2xl md:text-xl font-extrabold text-red-500 mr-2 font-poppins">
            Go
          </h1>
          <h1 className="text-2xl md:text-xl font-extrabold text-white font-poppins">
            Movie
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-base font-bold text-center md:text-left font-poppins">
          Endless Entertainment Anytime. Anywhere!
        </p>
      </div>
    </footer>
  );
};

export default Footer;

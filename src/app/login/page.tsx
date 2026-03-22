import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-screen from-blue-950 via-blue-900 to-blue-800 bg-linear-to-br flex items-center justify-center">
      <div className="w-full max-w-md text-center">
        {/* title */}
        <div>
          <div className="w-16 h-16 rounded-2xl shadow-xl bg-white/10 border border-white/20 flex justify-center items-center mx-auto mb-4">
            <Image
              src="/advance-digitals.png"
              alt="advance digitals logo"
              height={36}
              width={36}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Advance Digitals
          </h1>
          <p className="text-blue-200 text-sm mt-1">Sales Management System</p>
        </div>

        {/* card */}
        <div></div>
      </div>
    </div>
  );
};

export default LoginPage;

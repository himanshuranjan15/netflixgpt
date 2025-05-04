import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  console.log(isSignIn);
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="src/assets/anime.png" className="" />
      </div>
      <div className="absolute left-0 right-0 mx-auto my-36 text-white w-3/12 p-12 rounded-lg bg-black opacity-80 ">
        <form>
          <h1 className="font-bold text-3xl py-4">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              typeof="text"
              placeholder="Name"
              className="p-4 my-4 w-full bg-amber-50 text-black rounded-xl"
            />
          )}
          <input
            typeof="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-amber-50 text-black rounded-xl"
          />
          <input
            typeof="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-amber-50 text-black rounded-xl"
          />
          <button className="p-2 my-6 bg-red-700 w-full rounded-xl">
            {" "}
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <p className="cursor-pointer" onClick={toggleSignInForm}>
            {isSignIn
              ? "New to Netflix? Sign Up now!"
              : "Already a member? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

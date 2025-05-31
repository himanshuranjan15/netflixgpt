import { useRef, useState } from "react";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispath } from "../utils/reduxHooks";
import { addUser } from "../utils/userSlice";

const Login = () => {
  // const user = useAppSelector((store) => store.user);
  // if (user.uid) {
  //   navigate("/browse");
  // }
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const [isSignIn, setIsSignIn] = useState(true);
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  const handleButtonClick = () => {
    if (!email.current || !password.current) return;
    //Validate the form
    const nameValue: string = name.current?.value ?? "";
    const emailValue: string = email.current?.value ?? "";
    const passwordValue: string = password.current?.value ?? "";
    const msg = checkValidData(emailValue, passwordValue);

    // console.log(email, password);
    if (msg) setErrorMessage(msg);

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL: "usericon.png",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = user;
              dispatch(
                addUser({
                  uid: uid,
                  userName: displayName,
                  userEmail: email,
                  photoUrl: "usericon.png",
                })
              );
              console.log("Profile Updated");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
          console.log(userCredential);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.displayName);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };
  // useEffect(() => {});
  return (
    <div>
      <Header />
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/animeLight.jpg" // Assuming it's in the public folder
          className="w-full h-full object-cover"
          alt="Background"
        />
        {/* Overlay to darken the image slightly for better text contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Login Form Container */}
      <div className="relative flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-black bg-opacity-80 p-8 sm:p-12 rounded-lg text-white"
        >
          <h1 className="font-bold text-3xl sm:text-4xl py-4 mb-4 text-center sm:text-left">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 my-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          )}
          <input
            ref={email}
            type="email" // Changed to type="email" for better semantics and validation
            placeholder="Email Address"
            className="p-3 my-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            autoComplete="email"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 my-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            autoComplete={isSignIn ? "current-password" : "new-password"}
          />
          {errorMessage && ( // Conditionally render error message only if it exists
            <p className="text-red-500 font-semibold text-sm sm:text-base py-2 px-1 bg-red-100 bg-opacity-20 rounded-md">
              {errorMessage}
            </p>
          )}
          <button
            className="p-3 my-6 bg-red-600 hover:bg-red-700 w-full rounded-md font-semibold text-lg"
            onClick={handleButtonClick}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-sm sm:text-base text-gray-400 cursor-pointer hover:text-white transition-colors duration-200"
            onClick={toggleSignInForm}
          >
            {isSignIn
              ? "New to Netflix? "
              : "Already registered? "}
            <span className="font-semibold hover:underline">
              {isSignIn ? "Sign up now." : "Sign in."}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

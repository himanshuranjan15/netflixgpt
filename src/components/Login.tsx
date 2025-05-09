import { useRef, useState } from "react";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
import { useAppDispath } from "../utils/reduxHooks";
import { addUser } from "../utils/userSlice";

const Login = () => {
  // const user = useAppSelector((store) => store.user);
  // if (user.uid) {
  //   navigate("/browse");
  // }
  // const navigate = useNavigate();
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
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
          // navigate("/browse");
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
          console.log("logged IN", user);
          // navigate("/browse");
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
      <div className="absolute h-screen">
        <img src="animeLight.jpg" className="" />
      </div>
      <div className="absolute left-0 right-0 mx-auto my-36 text-white w-3/12 p-12 rounded-lg bg-black opacity-80 ">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="font-bold text-3xl py-4">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className="p-4 my-4 w-full bg-amber-50 text-black rounded-xl"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-amber-50 text-black rounded-xl"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-amber-50 text-black rounded-xl"
          />
          <p className="text-red-500 text-lg py-2">{errorMessage}</p>
          <button
            className="p-2 my-6 bg-red-700 w-full rounded-xl"
            onClick={handleButtonClick}
          >
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

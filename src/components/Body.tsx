import Login from "./Login";
import Browse from "./Browse";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispath } from "../utils/reduxHooks";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { auth } from "../utils/firebase";

const Body = () => {
  const dispatch = useAppDispath();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            userName: displayName,
            userEmail: email,
            photoUrl: photoURL,
          })
        );
      } else {
        dispatch(removeUser());
        // navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

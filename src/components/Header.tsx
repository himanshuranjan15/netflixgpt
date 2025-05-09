import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispath, useAppSelector } from "../utils/reduxHooks";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const user = useAppSelector((store) => store.user);
  // const photoUrl = useAppSelector((store) => store?.photoUrl);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
      })
      .catch((error) => {
        // An error happened.
        console.log("error" + error.message);
      });
  };
  useEffect(() => {
    const unsubscribe = () => {
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
          navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
    };
    return () => unsubscribe();
  }, [dispatch, navigate]);
  return (
    <div className="absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-40" src="Netflix_Logo_PMS.png" />
      {user.uid && (
        <div className="flex p-2">
          <img
            className="w-6 h-6 mt-3"
            alt="userIcon"
            src={user?.photoUrl ? user?.photoUrl : "user?.photoUrl"}
          />
          <button className="font-bold text-white" onClick={handleSignOut}>
            {" "}
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

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
  // Define a default user icon path
  const DEFAULT_USER_ICON = "/default-user-icon.png"; // Assuming it's in the public folder

  return (
    <div className="absolute w-full px-4 md:px-8 py-2 bg-gradient-to-b from-black z-30 flex flex-col md:flex-row justify-between items-center">
      <img
        className="w-32 sm:w-40 md:w-44 mx-auto md:mx-0"
        src="/Netflix_Logo_PMS.png" // Assuming it's in the public folder
        alt="Netflix Logo"
      />
      {user.uid && (
        <div className="flex items-center mt-2 md:mt-0">
          <img
            className="w-8 h-8 md:w-10 md:h-10 rounded-md mr-2 md:mr-3"
            alt="userIcon"
            src={user?.photoUrl || DEFAULT_USER_ICON} // Use default icon if photoUrl is not available
          />
          <button
            className="font-semibold text-white bg-red-600 hover:bg-red-700 py-1 px-2 md:py-2 md:px-4 rounded text-sm md:text-base"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

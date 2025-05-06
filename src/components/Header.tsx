import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispath, useAppSelector } from "../utils/reduxHooks";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const user = useAppSelector((store) => store.user);
  // const photoUrl = useAppSelector((store) => store?.photoUrl);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        dispatch(removeUser());
      })
      .catch((error) => {
        // An error happened.
        console.log("error" + error.message);
      });
  };
  return (
    <div className="absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-40" src="Netflix_Logo_PMS.png" />
      {user.userName && (
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

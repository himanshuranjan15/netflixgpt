import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispath, useAppSelector } from "../utils/reduxHooks";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGS } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const user = useAppSelector((store) => store.user);
  const showGPTSearch = useAppSelector((store) => store.gpt.active);
  // const photoUrl = useAppSelector((store) => store?.photoUrl);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser());
    });
  };
  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLanguage = (e: { target: { value: string } }) => {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        if (user?.uid) {
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
  }, []);
  return (
    <div className="absolute  w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between  ">
      <img className="w-44 mx-auto md:mx-0" src="Netflix_Logo_PMS.png" />
      {user.uid && (
        <div className="flex p-2">
          {showGPTSearch && (
            <select
              className="bg-gray-900 p-2 m-2 text-white rounded-2xl"
              onChange={handleLanguage}
            >
              {SUPPORTED_LANGS.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-4 m-2 p-2 mr-4 bg-purple-800 rounded-xl text-white"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? "HomePage" : "GPT Search"}
          </button>
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

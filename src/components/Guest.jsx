import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { IoPerson } from "react-icons/io5";

const Guest = () => {
  const navigate = useNavigate();

  const signUpAnonymously = async () => {
    try {
      await signInAnonymously(auth);

      const userRef = doc(db, "users", auth.currentUser.uid);

      const { currentUser } = auth;

      await setDoc(userRef, {
        displayName: "Guest",
        uid: currentUser.uid,
      });

      navigate("/chat");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Link
        onClick={signUpAnonymously}
        className="inline-flex h-12 w-72 items-center justify-center gap-4 rounded bg-black py-3 px-6 text-center font-medium text-white duration-500 hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <IoPerson size="1.5rem" />
        Login as a Guest
      </Link>
    </div>
  );
};

export default Guest;

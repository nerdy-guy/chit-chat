import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "../config/firebase";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";

const GoogleSignup = () => {
  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);

      const userRef = doc(db, "users", auth.currentUser.uid);

      const { currentUser } = auth;

      await setDoc(userRef, {
        displayName: currentUser.displayName,
        email: currentUser.email,
        photo: currentUser.photoURL,
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
        onClick={signUpWithGoogle}
        className="inline-flex h-12 w-72 items-center justify-center gap-4 rounded bg-white py-3 px-6 text-center font-medium text-black duration-500 hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <span>
          <FcGoogle size="1.5rem" />
        </span>
        Sign up with Google
      </Link>
    </div>
  );
};

export default GoogleSignup;

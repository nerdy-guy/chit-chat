import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Logout = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }

    navigate("/");
  };

  return (
    <div>
      <button
        onClick={handleSignOut}
        className="rounded bg-indigo-600 py-1 px-2 text-white duration-500 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:py-2 md:px-6"
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;

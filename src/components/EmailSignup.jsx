import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";

const EmailSignup = () => {
  return (
    <div>
      <Link
        to="/register"
        className="inline-flex h-12 w-72 items-center justify-center gap-4 rounded bg-blue-500 py-3 px-6 text-center font-medium text-white duration-500 hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <HiOutlineMail size="1.5rem" />
        Sign up with Email
      </Link>
    </div>
  );
};

export default EmailSignup;

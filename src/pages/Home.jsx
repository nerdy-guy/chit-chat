import GoogleSignup from "../components/GoogleSignup";
import Guest from "../components/Guest";
import EmailSignup from "../components/EmailSignup";
import Header from "../components/Logo";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Header />
      <EmailSignup />
      <GoogleSignup />
      <Guest />
    </div>
  );
};

export default Home;

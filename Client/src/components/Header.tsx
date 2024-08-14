import { useModals, useUser } from "@/store/UserStore";
import BlueButton from "./BlueButton";
import { useState } from "react";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";
import axios from "axios";

const Header = () => {
  axios.defaults.withCredentials = true;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { userLoggedIn, setUserLoggedIn } = useUser();
  const { setSignUp, setSignIn } = useModals();
  const logoutFunction = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://scissor-7s2y.onrender.com/logout"
      );
      if (response.status === 200) {
        setUserLoggedIn(false);
        toast({
          title: "Logged out",
          description: "Logged out successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unknown error occoured",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An uknown error occoured",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <nav className=" w-screen overflow-x-hidden py-5 flex items-center justify-between px-5 md:px-12 sticky top-0">
      <h1 className="text-gradient text-3xl sm:text-4xl font-bold ">Scissor</h1>
      <div className=" flex justify-between text-white p-0 m-0 gap-4 items-center">
        {userLoggedIn ? (
          <button
            onClick={logoutFunction}
            type="button"
            className=" outline-none rounded-full  px-6 cursor-pointer  h-[2.3rem] py-0 m-0 text-center border bg-[#181E29] hover:bg-[#2e3644d8] transition-all ease-in-out duration-300 border-gray-500 flex items-center"
          >
            {isLoading ? <Loader /> : <p className=" p-0 m-0">logout</p>}
          </button>
        ) : (
          <>
            <button
              onClick={() => setSignIn(true)}
              type="button"
              className=" outline-none rounded-full  px-6 cursor-pointer  h-[2.3rem] py-0 m-0 text-center border bg-[#181E29] hover:bg-[#2e3644d8] transition-all ease-in-out duration-300 border-gray-500 flex items-center"
            >
              <p className=" p-0 m-0">Login</p>
              <img
                src="/icons/sign-in.svg"
                alt="Sign in"
                width={20}
                height={20}
                className=" ml-2"
              />
            </button>
            <BlueButton
              type="button"
              buttonText="Register now"
              handleClick={() => setSignUp(true)}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

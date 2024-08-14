import BlueButton from "@/components/BlueButton";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ViewAccountLinks from "@/components/ViewAccountLinks";
import ShortenSubmit from "@/components/ShortenSubmit";
import SignupModal from "@/components/SignupModal";
import SigninModal from "@/components/SigninModal";
import { useAllUserLinks, useUser } from "@/store/UserStore";
import axios from "axios";
import Loader from "@/components/Loader";

// Define types for props and state
interface ErrorResponse {
  response: {
    status: number;
    data: {
      error: string;
    };
  };
}
interface UserLink {
  originalLink: string;
  shortenedLink: string;
  qrCodeUrl: string;
  clicks: { count: number; country: string }[];
}

const Home = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accountsDialogOpen, setAccountsDialogOpen] = useState<boolean>(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { userLoggedIn, setUserLoggedIn } = useUser();
  const { setAllMyLinks } = useAllUserLinks();
  const { toast } = useToast();
  const [domain, setDomain] = useState<string>("");

  // Function to submit the form
  const submitFunc = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    try {
      const response = await axios.post(
        "https://scissor-7s2y.onrender.com/create",
        {
          link: inputValue,
          domain: domain,
        }
      );
      if (response.status === 200) {
        const newDomain: UserLink = response.data.newLink;
        setAllMyLinks((prevLinks) => [...prevLinks, newDomain]);

        toast({
          title: "Success",
          description: "URL shortened successfully",
        });
      }
      setDomain("");
      setInputValue("");
      setSubmitDialogOpen(false);
    } catch (err) {
      const error = err as ErrorResponse;
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please login to use this feature",
        });
      } else if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Domain already taken",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response.data.error || "An unexpected error occurred",
        });
      }
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Verify user login status on mount
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(
          "https://scissor-7s2y.onrender.com/verify"
        );
        setUserLoggedIn(response.status === 200);
      } catch {
        setUserLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, []);

  // Handle switch to copy from clipboard
  const switchFunction = async (change: boolean) => {
    try {
      if (change) {
        const clipboardText = await navigator.clipboard.readText();
        setInputValue(clipboardText);
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please grant permission to read your clipboard",
      });
    }
  };

  // Handle input change
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-contain bg-[url('/bg-image.jpg')] w-screen h-screen flex flex-col">
      <Header />
      <main className="w-screen flex justify-center items-center flex-col pt-12 md:pt-24 px-6">
        <h1 className="text-3xl lg:text-5xl text-gradient2 text-center font-bold">
          Shorten your looooooong links :)
        </h1>
        <p className="font-light text-md text-[#C9CED6] mt-4 brightness-75 text-center">
          Scissor is an efficient and easy-to-use URL shortening service that
          streamlines your streaming experience
        </p>
        <Input
          inputValue={inputValue}
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            if (inputValue.trim()) {
              if (userLoggedIn) {
                setSubmitDialogOpen(true);
              } else {
                toast({
                  variant: "destructive",
                  title: "Authentication required",
                  description: "Please login to use this feature",
                });
              }
            } else {
              toast({
                variant: "destructive",
                title: "Error",
                description: "Please input a valid URL",
              });
            }
          }}
          handleChange={inputChange}
        />
        <div className="flex mt-4 justify-center items-center">
          <Switch
            onCheckedChange={switchFunction}
            id="copy"
            className="bg-red-600"
          />
          <label htmlFor="copy" className="m-0 p-0 ml-2 text-white">
            Copy from clipboard
          </label>
        </div>
        <BlueButton
          buttonText="View all your shortened links"
          className="mt-5 py-3 rounded-full px-4"
          handleClick={() => {
            if (userLoggedIn) {
              setAccountsDialogOpen(true);
            } else {
              toast({
                variant: "destructive",
                title: "Authentication required",
                description: "Please login to use this feature",
              });
            }
          }}
          type="button"
        />
        <ViewAccountLinks
          open={accountsDialogOpen}
          setOpenChange={setAccountsDialogOpen}
        />
        <ShortenSubmit
          isLoading={isSubmitLoading}
          changeOpen={() => setSubmitDialogOpen(false)}
          isOpen={submitDialogOpen}
          textValue={inputValue}
          submitFunc={submitFunc}
          domain={domain}
          change={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDomain(e.target.value)
          }
        />
        <SignupModal />
        <SigninModal />
      </main>
    </section>
  );
};

export default Home;

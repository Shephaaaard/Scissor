import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import axios from "axios";

const RedirectPage = () => {
  const { toast } = useToast();
  const { domainUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await axios.get(
          `https://scissor-7s2y.onrender.com/link/${domainUrl}`
        );
        if (response.status === 200) {
          const originalLink = response.data.originalLink;
          // Ensure the URL is valid
          const url =
            originalLink.startsWith("http://") ||
            originalLink.startsWith("https://")
              ? originalLink
              : "http://" + originalLink;

          // Navigate directly using the navigate function
          window.location.href = url;
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Link does not exist",
          });
          navigate("/home");
        }
      } catch (err) {
        // Handle different error cases
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while trying to redirect.",
        });
        console.error(err);
        navigate("/home");
      }
    };
    redirect();
  }, [domainUrl, toast]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default RedirectPage;

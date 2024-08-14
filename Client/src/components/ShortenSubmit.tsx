import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import BlueButton from "./BlueButton";
import Loader from "./Loader";
interface shortenSubmit {
  changeOpen: (data: boolean) => void;
  isOpen: boolean;
  textValue: string;
  domain: string;
  isLoading: boolean;
  submitFunc: (e: React.FormEvent) => void;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ShortenSubmit = ({
  isOpen,
  changeOpen,
  textValue,
  domain,
  change,
  submitFunc,
  isLoading,
}: shortenSubmit) => {
  return (
    <Dialog open={isOpen} onOpenChange={changeOpen}>
      <DialogContent className=" bg-[#0B101B] opacity-100 text-white shadow-2xl">
        <DialogTitle>Shorten Link</DialogTitle>
        <form onSubmit={() => {}}>
          <label className=" flex flex-col w-full gap-2 items-center text-lg">
            Inputted link
            <input
              className=" rounded-full py-2 pl-4 bg-[#353C4A] w-full text-white border-0 outline-none brightness-75"
              type="text"
              value={textValue}
              disabled
            />
          </label>
          <label className=" flex flex-col w-full gap-2 items-center text-lg">
            Domain
            <input
              className=" rounded-full py-2 pl-4 bg-[#353C4A] w-full text-white border-0 outline-none"
              placeholder="Enter your preferred domain"
              type="text"
              onChange={change}
              value={domain}
            />
          </label>
          <BlueButton
            buttonText={isLoading ? <Loader /> : "Shorten"}
            handleClick={submitFunc}
            type="submit"
            className=" mt-4 py-3 px-4 rounded-full"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShortenSubmit;

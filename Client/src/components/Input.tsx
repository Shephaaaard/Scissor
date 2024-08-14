import BlueButton from "./BlueButton";
import React from "react";
interface Input {
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}
const Input = ({ inputValue, handleChange, onSubmit }: Input) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 outline-none bg-[#353C4A] w-full md:w-[50%] rounded-full border border-gray-400 h-fit flex flex-row gap-0 items-center justify-between "
    >
      <input
        value={inputValue}
        onChange={handleChange}
        className=" rounded-l-full bg-inherit h-full py-4 pl-4 w-[82%] text-white border-0 outline-none"
        type="text"
        placeholder="Enter your link here"
      />
      <BlueButton
        className=" h-[80%] py-2 hidden md:visible px-10 text-nowrap"
        buttonText="Shorten now"
        handleClick={() => {
          console.log("Yes");
        }}
      />
      <BlueButton
        type="submit"
        className=" h-[70%] mr-2 py-2 w-fit p-3 rounded-full md:hidden"
        buttonText={
          <img src="/icons/arrow-right.svg" width={18} height={18} alt="send" />
        }
        handleClick={onSubmit}
      />
    </form>
  );
};

export default Input;

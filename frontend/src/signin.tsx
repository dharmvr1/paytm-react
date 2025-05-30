import { Heading } from "./components/heading";
import { InputBox } from "./components/input";
import { SubHeading } from "./components/subheading";
import { ButtomWarming } from "./components/buttomWarming";
import { Button } from "./components/button";
export function Signin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/20 ">
      <div className="bg-white flex flex-col gap-3 items-center max-w-[400px] rounded-xl px-5 py-5 shadow-2xl z-20">
        <Heading text="Sign In" />
        <SubHeading text="Enter your Credentials to access your account" />

        <InputBox type="text" placeholder="John@user" heading="Username" />

        <InputBox type="password" placeholder="12345" heading="Password" />
        <Button text="Signin" color="black" />
        <ButtomWarming text="Don't have An account?Signup" />
      </div>
    </div>
  );
}

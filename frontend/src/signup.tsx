import { Heading } from "./components/heading";
import { InputBox } from "./components/input";
import { SubHeading } from "./components/subheading";
import { ButtomWarming } from "./components/buttomWarming";
import { Button } from "./components/button";
export function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/20 ">
      <div
        className="bg-white flex flex-col gap-3 items-center max-w-[400px]   rounded-xl px-5 py-5 shadow-2xl z-20"
      >
        <Heading text="Sign Up" />
        <SubHeading text="Enter your information to Create an account" />
        
        <InputBox type="text" placeholder="John@user" heading="Username" />
        <InputBox type="text" placeholder="John" heading="First Name" />
        <InputBox type="text" placeholder="Doe" heading="Last Name" />
        <InputBox type="password" placeholder="12345" heading="Password" />
        <Button text="Signup" color="black" />
        <ButtomWarming text="Already have An account?login" />
      </div>
    </div>
  );
}

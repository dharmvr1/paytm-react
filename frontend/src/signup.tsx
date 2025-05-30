import { Heading } from "./components/heading";
import { InputBox } from "./components/input";
import { SubHeading } from "./components/subheading";
import { ButtomWarming } from "./components/buttomWarming";
import { Button } from "./components/button";
import { useRef } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export function Signup() {
    const navigate=useNavigate()
  // @ts-ignore
  const userNameRef = useRef<React.Ref<HTMLInputElement>>();
  const fisrtNameRef = useRef<React.Ref<HTMLInputElement>>();
  const lastNameRef = useRef<React.Ref<HTMLInputElement>>();
  const passwordRef = useRef<React.Ref<HTMLInputElement>>();
  async function sign() {
    console.log("hello sign")
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
      username: userNameRef.current?.value,
      password: passwordRef.current?.value,
      firstName: fisrtNameRef.current?.value,
      lastName: lastNameRef.current?.value,
    });
    localStorage.setItem("token",response.data.token)
    navigate("/dashboard")

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/20 ">
      <div className="bg-white flex flex-col gap-3 items-center max-w-[400px]   rounded-xl px-5 py-5 shadow-2xl z-20">
        <Heading text="Sign Up" />
        <SubHeading text="Enter your information to Create an account" />

        <InputBox
          refer={userNameRef}
          type="text"
          placeholder="John@user"
          heading="Username"
        />
        <InputBox
          refer={fisrtNameRef}
          type="text"
          placeholder="John"
          heading="First Name"
        />
        <InputBox
          refer={lastNameRef}
          type="text"
          placeholder="Doe"
          heading="Last Name"
        />
        <InputBox
          refer={passwordRef}
          type="password"
          placeholder="12345"
          heading="Password"
        />
        <Button onclick={sign} text="Signup" color="black" />
        <ButtomWarming fn={()=>{navigate("/signin")}} text="Already have An account?login" />
      </div>
    </div>
  );
}

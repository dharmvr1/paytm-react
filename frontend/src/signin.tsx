import { Heading } from "./components/heading";
import { InputBox } from "./components/input";
import { SubHeading } from "./components/subheading";
import { ButtomWarming } from "./components/buttomWarming";
import { Button } from "./components/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
export function Signin() {
  const navigate = useNavigate();
  const userNameRef = useRef<React.Ref<HTMLInputElement>>();
  const passwordRef = useRef<React.Ref<HTMLInputElement>>();
  async function login() {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      }
    );
    return response.data;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/20 ">
      <div className="bg-white flex flex-col gap-3 items-center max-w-[400px] rounded-xl px-5 py-5 shadow-2xl z-20">
        <Heading text="Sign In" />
        <SubHeading text="Enter your Credentials to access your account" />

        <InputBox
          refer={userNameRef}
          type="text"
          placeholder="John@user"
          heading="Username"
        />

        <InputBox
          refer={passwordRef}
          type="password"
          placeholder="12345"
          heading="Password"
        />
        <Button
          onclick={() => {
            login().then((res) => {
              localStorage.setItem("token",res.token)
              navigate("/dashboard");
            });
          }}
          text="Signin"
          color="black"
        />
        <ButtomWarming
          fn={() => {
            navigate("/signup");
          }}
          text="Don't have An account?Signup"
        />
      </div>
    </div>
  );
}

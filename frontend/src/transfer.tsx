import { Heading } from "./components/heading";
import { InputBox } from "./components/input";
import { Button } from "./components/button";
import { useContext, useRef, useState } from "react";
import { sendContext } from "./context";
import axios from "axios";
export function Transfer() {
  const context = useContext(sendContext);
  const inputRef = useRef<HTMLInputElement>();
  const [payment, setPayment] = useState(false);
  const senduser = context.senduser;
  const setSendUser = context.setSendUser;
  async function transfer() {
    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
          to: senduser?.id,
          amount: inputRef.current.value,
        },{
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-black/20 ">
      <div className="flex flex-col py-6 px-7 shadow-2xl bg-white rounded-lg items-center">
        <Heading text="Send Money" />
        <div className="flex flex-col mt-10 gap-5">
          <h1 className="text-2xl font-medium">{senduser?.firstName}</h1>
          <InputBox
            refer={inputRef}
            type="text"
            placeholder="Enter Amount"
            heading="Amount (in $)"
          />
          <Button
            onclick={() => {
              transfer().then((response) => console.log(response.data)).catch((e)=>{console.log(e.message)});
            }}
            color="green"
            text="Initiate Tranfer"
          ></Button>
        </div>
      </div>
    </div>
  );
}

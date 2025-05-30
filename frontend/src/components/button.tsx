interface Ibutton {
  color: string;
  text: string;
  onclick?:()=>void
}

export function Button({ color, text ,onclick}: Ibutton) {
  return (
    <button
    type="button"
    onClick={onclick}
      className={`px-3 py-2 flex justify-center rounded-lg w-full items-center ${
        color === "black" ? "bg-black" : "bg-green-500"
      } text-white text-lg font-medium `}
    >
      {text}
    </button>
  );
}

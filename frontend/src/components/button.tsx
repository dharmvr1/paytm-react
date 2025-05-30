interface Ibutton {
  color: string;
  text: string;
}

export function Button({ color, text }: Ibutton) {
  return (
    <button
      className={`px-3 py-2 flex justify-center rounded-lg w-full items-center ${
        color === "black" ? "bg-black" : "bg-green-500"
      } text-white text-lg font-medium `}
    >
      {text}
    </button>
  );
}

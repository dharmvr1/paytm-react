import React, { createContext, useState } from "react";

interface Isend {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface IsendContext {
  senduser: Isend | undefined;
  setSendUser: React.Dispatch<React.SetStateAction<Isend | undefined>>;
}

// Provide default fallback to avoid undefined context usage
export const sendContext = createContext<IsendContext>({
  senduser: undefined,
  setSendUser: () => {}, // dummy function
});

export function SendContextProvider({ children }: { children: React.ReactNode }) {
  const [senduser, setSendUser] = useState<Isend | undefined>();

  return (
    <sendContext.Provider value={{ senduser, setSendUser }}>
      {children}
    </sendContext.Provider>
  );
}
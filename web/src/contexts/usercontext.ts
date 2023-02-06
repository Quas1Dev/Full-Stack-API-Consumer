import { createContext, useState } from "react";

interface UserContextProps {
    user: string;
    setUser: (user: string) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: "",
    setUser: () => { }
});
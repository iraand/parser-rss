import { createContext } from 'react';
import { IUser } from "../types/user.type";

interface IUserContext {
    user: IUser | undefined | null,
    setUser: any
}

export const UserContext = createContext<IUserContext>({
    user: undefined,
    setUser: () => { }
});
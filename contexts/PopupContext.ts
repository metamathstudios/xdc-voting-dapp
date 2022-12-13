import { createContext, Dispatch, SetStateAction } from "react";

interface ContextType {
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
}

export const PopupContext = createContext({} as ContextType);

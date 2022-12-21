import { createContext, Dispatch, SetStateAction, useState } from "react";

interface StatusContext {
    statusUpdated: boolean;
    setStatusUpdated: Dispatch<SetStateAction<boolean>>;
}

export const StatusContext = createContext({} as StatusContext);

const StatusProvider = ({ children }) => {
    
        const [statusUpdated, setStatusUpdated] = useState(false);
    
        return (
            <StatusContext.Provider value={{ statusUpdated, setStatusUpdated }}>
                {children}
            </StatusContext.Provider>
        );
    }

export default StatusProvider;
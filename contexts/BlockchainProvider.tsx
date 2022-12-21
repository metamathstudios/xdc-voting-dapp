import VotingHubWrapper from "../blockchain/VotingHubWrapper";
import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "./Web3ModalProvider";

interface IBlockchainContext {
    votingHub: VotingHubWrapper | null;
}

export const BlockchainContext = createContext<IBlockchainContext>({} as IBlockchainContext);

export const BlockchainProvider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext);
    const [votingHub, setVotingHub] = useState<VotingHubWrapper | null>(null);

    useEffect(() => {
        if (web3 && chainId) {
            try {
                const _votingHub = new VotingHubWrapper(web3, chainId, account);
                setVotingHub(_votingHub);
            } catch (e) {
                console.log(e);
            }            
        } else {
            setVotingHub(null);
        }
    }, [web3, chainId, account]);

    return (
        <BlockchainContext.Provider value={{ votingHub }}>
            {children}
        </BlockchainContext.Provider>
    );
};

export default BlockchainProvider;
import { useState, useEffect, createContext, useCallback } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { providerOptions } from "xdcpay-connect";

interface IWebModalContext {
  web3: Web3 | null;
  connect: () => void;
  disconnect: () => void;
  account: string | null;
  chainId: number | null;
};

export const Web3ModalContext = createContext<IWebModalContext>({
  web3: null,
  connect: () => {},
  disconnect: () => {},
  account: null,
  chainId: null,
});

const Web3ModalProvider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    const _web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      disableInjectedProvider: false,
    });

    setWeb3Modal(_web3Modal);
  }, []);

  const createWeb3 = (provider) => {
    var realProvider;
    if (typeof provider === "string") {
      if (provider.includes("wss")) {
        realProvider = new Web3.providers.WebsocketProvider(provider);
      } else {
        realProvider = new Web3.providers.HttpProvider(provider);
      }
    } else {
      realProvider = provider;
    }
    return new Web3(realProvider);
  };

  const resetWeb3 = useCallback(() => {
    setWeb3(null);
    setAccount(null);
    setChainId(null);
  }, []);

  const subscribeProvider = useCallback(
    async (_provider: any, _web3: Web3) => {
      if (!_provider.on) return;

      _provider.on("close", () => {
        resetWeb3();
      });
      _provider.on("accountsChanged", async (accounts: string[]) => {
        setAccount(_web3.utils.toChecksumAddress(accounts[0]));
      });
      _provider.on("networkChanged", async () => {
        const chainId = await _web3.eth.getChainId();
        setChainId(Number(chainId));
      });
    },
    [resetWeb3]
  );

  const connect = useCallback(async () => {
    if(!web3Modal) return;

    const _provider = await web3Modal.connect();
    if (_provider === null) return;

    const _web3 = createWeb3(_provider);
    setWeb3(_web3);

    await subscribeProvider(_provider, _web3);

    const accounts = await _web3.eth.getAccounts();
    const _account = _web3.utils.toChecksumAddress(accounts[0]);
    const _chainId = await _web3.eth.getChainId();

    setAccount(_account);
    setChainId(Number(_chainId));

  }, [web3Modal, subscribeProvider]);

    const disconnect = useCallback(async () => {
        if(web3 && web3.currentProvider) {
            const _provider : any = web3.currentProvider;
            if(_provider.close) {
                await _provider.close();
            }
        }
        if(web3Modal) {
            await web3Modal.clearCachedProvider();
        }
        resetWeb3();
    }, [web3, web3Modal, resetWeb3]);

    return (
        <Web3ModalContext.Provider
            value={{
                web3,
                connect,
                disconnect,
                account,
                chainId,
            }}>
            {children}
        </Web3ModalContext.Provider>
    );
};

export default Web3ModalProvider;
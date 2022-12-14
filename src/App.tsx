import { useEffect, useState } from "react";
import { Web3AuthCore } from "@web3auth/core";
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./tezosRPC";
import "./App.css";
import NearRPC from "./nearRPC";
import AlgorandRPC from "./algorandRPC";

const clientId =
  "BFgsQCpMzp4qKQx6_sacp1OC50leBtVDG3mXNUAtcF7Hcn2pWxJjCtw-G7ornKb_euOwJ8clWuciFoH2oiiB0rg"; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthCore({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.OTHER,
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network: "testnet",
            uxMode: "popup",
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        await web3auth.init();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const onGetAlgorandKeyPair = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new AlgorandRPC(provider as SafeEventEmitterProvider);
    const keyPair = await rpc.getAlgorandKeyPair();
    console.log(keyPair);
  };

  const onGetNearKeyPair = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new NearRPC(provider as SafeEventEmitterProvider);
    const nearKey = await rpc.getNearKeyPair();
    console.log(nearKey);
  };

  const onGetNearAccount = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new NearRPC(provider as SafeEventEmitterProvider);
    const nearAccount = await rpc.getAccounts();
    console.log(nearAccount);
  };

  const onGetNearConnection = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new NearRPC(provider as SafeEventEmitterProvider);
    const nearConnection = await rpc.makeConnection();
    console.log(nearConnection);
  };

  const onGetTezosKeyPair = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const tezosKey = await rpc.getTezosKeyPair();
    console.log(tezosKey);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    console.log(userAccount);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signMessage();
    console.log(result);
  };

  const signAndSendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signAndSendTransaction();
    console.log(result);
  };
  const loggedInView = (
    <>
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={onGetAlgorandKeyPair} className="card">
        Get Algorand Key Pair
      </button>

      <button onClick={onGetTezosKeyPair} className="card">
        Get Tezos Key Pair
      </button>
      <button onClick={onGetNearKeyPair} className="card">
        Get Near Key Pair
      </button>
      <button onClick={onGetNearAccount} className="card">
        Get Near account
      </button>
      <button onClick={onGetNearConnection} className="card">
        Get Near Connection
      </button>

      <button onClick={getAccounts} className="card">
        Get Accounts
      </button>
      <button onClick={getBalance} className="card">
        Get Balance
      </button>
      <button onClick={signMessage} className="card">
        Sign Message
      </button>
      <button onClick={signAndSendTransaction} className="card">
        Sign And Send Transaction
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth
        </a>
        & ReactJS Example
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/Web3Auth/tree/master/examples/react-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
}

export default App;

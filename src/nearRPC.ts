import { KeyStore } from "near-api-js/lib/key_stores";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { connect, KeyPair, keyStores, WalletConnection } from "near-api-js";
import { hex2buf } from "@taquito/utils";
import { base_encode } from "near-api-js/lib/utils/serialize";
export default class NearRPC {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  makeConnection = async () => {
    const myKeyStore = new keyStores.InMemoryKeyStore();
    const keyPair = await this.getNearKeyPair();
    await myKeyStore.setKey("testnet", "example-account.testnet", keyPair);

    // connections can be made to any network
    // refer https://docs.near.org/tools/near-api-js/quick-reference#connect

    const connectionConfig = {
      networkId: "testnet",
      keyStore: myKeyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    const nearConnection = await connect(connectionConfig);
    const walletConnection = new WalletConnection(
      nearConnection,
      "example-app"
    );
    console.log("walletConnection", walletConnection);
    const walletAccountObj = walletConnection.account();
    console.log("walletAccountObj", walletAccountObj);
    const account = await nearConnection.account("example-account.testnet");
    console.log("account", account);
    const accountBalance = await account.getAccountBalance();
    console.log("accountBalance", accountBalance);
  };
  getNearKeyPair = async (): Promise<any> => {
    try {
      const privateKey = (await this.provider.request({
        method: "private_key",
      })) as string;
      const keyPair = KeyPair.fromString(base_encode(privateKey));
      return keyPair;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getAccounts = async () => {
    try {
      const keyPair = await this.getNearKeyPair();
      return keyPair?.getPublicKey().toString().split(":")[1];
    } catch (error) {
      console.error("Error", error);
    }
  };

  getBalance = async () => {
    try {
      const keyPair = await this.getNearKeyPair();
      // keyPair.pkh is the account address.
      // const balance =
      // return balance;
    } catch (error) {
      return error;
    }
  };
}

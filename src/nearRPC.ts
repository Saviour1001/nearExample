import { KeyStore } from "near-api-js/lib/key_stores";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { KeyPair } from "near-api-js";
export default class NearRPC {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  getNearKeyPair = async (): Promise<any> => {
    try {
      console.log("here");
      const privateKey = (await this.provider.request({
        method: "solanaPrivateKey",
      })) as string;
      console.log("privateKey", privateKey);
      const keyPair = KeyPair.fromRandom("secp256k1");
      // const PRIVATE_KEY =
      //   "by8kdJoJHu7uUkKfoaLd2J2Dp1q1TigeWMG123pHdu9UREqPcshCM223kWadm";
      const sk =
        "2F2vQ1zQx9CP6vnoeMYomRResLvPrbQfRJTo3S746ZC7znAqzbXLMuMQrLd7nbWpxzx62Z9k8UL5vQjXSiQ7joyK";
      // console.log("keyPair", keyPair);
      // const keyPair2 = KeyPair.fromString(sk);
      // console.log("keyPair2", keyPair2);
      return keyPair;

      //   const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(privateKey));
      //   return keyPair;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

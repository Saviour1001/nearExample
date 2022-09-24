import { KeyStore } from "near-api-js/lib/key_stores";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { KeyPair } from "near-api-js";
import { hex2buf } from "@taquito/utils";
import { base_encode } from "near-api-js/lib/utils/serialize";
export default class NearRPC {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

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
}

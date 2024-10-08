import { useEffectOnce, useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { Chain, hardhat } from "viem/chains";
import { Connector, useAccountEffect, useConnect } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const SCAFFOLD_WALLET_STORAGE_KEY = "scaffoldEth2.wallet";
const WAGMI_WALLET_STORAGE_KEY = "wagmi.wallet";

// ID of the SAFE connector instance
const SAFE_ID = "safe";

/**
 * This function will get the initial wallet connector (if any), the app will connect to
 * @param initialNetwork
 * @param previousWalletId
 * @param connectors
 * @returns
 */
const getInitialConnector = (
  initialNetwork: Chain,
  previousWalletId: string,
  connectors: Connector[],
): { connector: Connector | undefined; chainId?: number } | undefined => {
  // Look for the SAFE connector instance and connect to it instantly if loaded in SAFE frame
  const safeConnectorInstance = connectors.find(connector => connector.id === SAFE_ID && connector.ready);

  if (safeConnectorInstance) {
    return { connector: safeConnectorInstance };
  }

  const allowBurner = scaffoldConfig.onlyLocalBurnerWallet ? initialNetwork.id === hardhat.id : true;

  if (previousWalletId) {
    // the user was connected to wallet
    if (scaffoldConfig.walletAutoConnect) {
      if (!allowBurner) {
        return;
      }

      const connector = connectors.find(f => f.id === previousWalletId);
      return { connector };
    }
  }

  return undefined;
};

/**
 * Automatically connect to a wallet/connector based on config and prior wallet
 */
export const useAutoConnect = (): void => {
  const wagmiWalletValue = useReadLocalStorage<string>(WAGMI_WALLET_STORAGE_KEY);
  const [walletId, setWalletId] = useLocalStorage<string>(SCAFFOLD_WALLET_STORAGE_KEY, wagmiWalletValue ?? "", {
    initializeWithValue: false,
  });
  const connectState = useConnect();
  useAccountEffect({
    onConnect({ connector }) {
      setWalletId(connector?.id ?? "");
    },
    onDisconnect() {
      window.localStorage.setItem(WAGMI_WALLET_STORAGE_KEY, JSON.stringify(""));
      setWalletId("");
    },
  });

  useEffectOnce(() => {
    const initialConnector = getInitialConnector(
      getTargetNetworks()[0],
      walletId,

      //@ts-ignore
      connectState.connectors,
    );

    if (initialConnector?.connector) {
      connectState.connect({ connector: initialConnector.connector, chainId: initialConnector.chainId });
    }
  });
};

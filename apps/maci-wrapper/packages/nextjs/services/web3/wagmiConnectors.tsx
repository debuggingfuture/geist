import { mainnet } from "viem/chains";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const targetNetworks = getTargetNetworks();

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const chains = targetNetworks.find(network => network.id === 1) ? targetNetworks : [...targetNetworks, mainnet];

/**
 * Chains for the app
 */
// export const appChains = configureChains(
//   enabledChains,
//   [
//     alchemyProvider({
//       apiKey: scaffoldConfig.alchemyApiKey,
//     }),
//     publicProvider(),
//   ],
//   {
//     // We might not need this checkout https://github.com/scaffold-eth/scaffold-eth-2/pull/45#discussion_r1024496359, will test and remove this before merging
//     stallTimeout: 3_000,
//     // Sets pollingInterval if using chains other than local hardhat chain
//     ...(targetNetworks.find(network => network.id !== chains.hardhat.id)
//       ? {
//           pollingInterval: scaffoldConfig.pollingInterval,
//         }
//       : {}),
//   },
// );

// const walletsOptions = { chains, projectId: scaffoldConfig.walletConnectProjectId };
// const wallets = [
//   injected({ ...walletsOptions, shimDisconnect: true }),
//   // walletConnectWallet(walletsOptions),
//   // ledgerWallet(walletsOptions),
//   // braveWallet(walletsOptions),
//   // coinbaseWallet({ ...walletsOptions, appName: "scaffold-eth-2" }),
//   // rainbowWallet(walletsOptions),
//   // safeWallet({ ...walletsOptions }),
// ];

// /**
//  * wagmi connectors for the wagmi context
//  */
// export const wagmiConnectors = connectorsForWallets([
//   {
//     groupName: "Supported Wallets",
//     wallets,
//   },
// ]);

import { createConfig, http } from "wagmi";
import { chains } from "./wagmiConnectors";

const transports = Object.fromEntries(chains.map(chain => [chain.id, http()]));

export const wagmiConfig = createConfig({
  chains: chains as any,
  transports,
});

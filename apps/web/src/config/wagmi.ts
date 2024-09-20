import { http } from "viem";
import { optimism, optimismSepolia } from "viem/chains";
import { createConfig } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [optimism, optimismSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [optimism.id]: http(),
    [optimismSepolia.id]: http(),
  },
});

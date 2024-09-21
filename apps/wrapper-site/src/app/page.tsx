"use client";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { http } from "viem";
import { optimism, optimismSepolia } from "viem/chains";
import { createConfig, WagmiProvider } from "wagmi";

const wagmiConfig = createConfig({
  chains: [optimism, optimismSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [optimism.id]: http(),
    [optimismSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }): JSX.Element {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "f1af1b5b-2834-4399-a010-451a270c31f3",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Providers>
        <div className="border-2 border-neutral rounded-md p-5">
          <h1 className="font-bold text-center mb-2 text-2xl">Geist Gateway</h1>
          <div>Please verify your wallet to view the preview page</div>
          <div className="flex items-center justify-center my-3">
            <DynamicWidget
              buttonClassName="!w-full"
              buttonContainerClassName="!w-full"
            />
          </div>

          <button className="cursor-pointer text-lg bg-primary text-primary-content border-2 rounded-md border-neutral py-2 w-full hover:bg-accent hover:bg-accent-content">
            Sign Message and Preview
          </button>
        </div>
      </Providers>
    </main>
  );
}

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { http, useAccount } from "wagmi";
import { createEnsPublicClient } from "@ensdomains/ensjs";
import { useTargetNetwork } from "../hooks/scaffold-eth/useTargetNetwork";

const EnsContext = createContext<any | null>(null);

// we create provider to save render count
export function EnsProvider({ children }: { children: ReactNode }) {
  const { chain, isConnecting } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const [ensPublicClient, setEnsPublicClient] = useState<ReturnType<typeof createEnsPublicClient> | undefined>();

  useEffect(() => {
    if (chain) {
      const newPublicClient = createEnsPublicClient({
        chain: targetNetwork,
        transport: http(),
      });
      setEnsPublicClient(newPublicClient);
    }
  }, [chain, targetNetwork]);

  const isLoading = isConnecting;

  const value = {
    ensPublicClient,
    isLoading,
  };

  return <EnsContext.Provider value={value}>{children}</EnsContext.Provider>;
}

"use client";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { http } from "viem";
import { optimism, optimismSepolia, sepolia } from "viem/chains";
import { createConfig, useAccount, useEnsAddress, useEnsResolver, useEnsText, useSignMessage, WagmiProvider } from "wagmi";

function getCookieValue(name: string) {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
}

const wagmiConfig = createConfig({
  chains: [sepolia, optimism, optimismSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [optimismSepolia.id]: http(),
  },
  ccipRead: {
    // data is the binary calldata
    async request({ data, sender, urls }) {

      console.log('ccip read', data, sender, urls);
      let url = urls?.[0];

      if (url === 'https://ccip-v2.ens.xyz') {
        const getUrl = url.replace('{sender}', sender).replace('{data}', data);

        return fetch(getUrl)
      }

      // use SameSite=None; Secure and credentials:include later to skip this step
      const token = localStorage.getItem('dynamic_authentication_token');
      console.log('token', token);

      // can load from dns txt record from contract or UI
      const encryptedHash = getCookieValue('targetEncryptedHash') || '+NqvZYSQACT+Q45bRiYtQbQV1i+ifFrye8M9IPgp04vBfmDJdXtnzq8Kl5EvEbWypQj9at/NKBA4CmR3itxeS33oJS0HKRtPLa1NycAxuWCgvVAAJ2WT';
      console.log('token', token);
      console.log('encryptedHash', encryptedHash)

      // TODO replace contract
      // consider adding nonce to avoid replay attack
      const postUrl = url.replace('{sender}', sender).replace('/{data}.json', '');

      const results = await fetch(postUrl, {
        method: 'POST',
        body: JSON.stringify({ data, token: JSON.parse(token || ''), encryptedHash }),
        // after CF supports so
        // credentials: 'include',
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log('error', err)
        });


      const { data: ccipData, decrypted: ipsfHash } = results;

      console.log('response from gateway', ccipData, ipsfHash);

      // we should verify with ccipdata, then redriect

      const ipfsUrl = `https://${ipsfHash}.ipfs.fleek.cool`;

      setTimeout(() => {
        window.location.replace(ipfsUrl);

      }, 30 * 1000)

      return ccipData



    }
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

function Page(): JSX.Element {
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [targetDomain, setTargetDomain] = useState<string | undefined>(undefined)
  const [authToken, setAuthToken] = useState<string | undefined>(undefined)

  const searchParams = useSearchParams();

  useEffect(() => {
    const targetParams = searchParams.get("target");
    setTargetDomain(targetParams || 'preview2.ethsg24.eth');
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('dynamic_authentication_token');
    if (token) {
      setAuthToken(token);
    }
  }, [isConnected])


  const { isLoading, data: resolver } = useEnsResolver({
    chainId: sepolia.id,
    name: targetDomain,
  })

  // always  https://ccip-v2.ens.xyz 
  const { data: ensTextTarget, isLoading: isEnsTextTargetLoading, refetch } = useEnsText({
    // public resolver
    // universalResolverAddress: resolver,
    key: 'encryptedHash',
    chainId: sepolia.id,
    name: targetDomain,
    query: {
      enabled: false
    }
  });

  const { data: ensAddress, isLoading: isLoadingEns, refetch: refetchAddress } = useEnsAddress({
    universalResolverAddress: resolver,
    chainId: sepolia.id,
    name: targetDomain,
    query: {
      enabled: false
    }
  });

  useEffect(() => {
    console.log('resolver', resolver, isLoading)
    if (resolver && authToken) {
      refetch();
      refetchAddress();
      console.log('fetch', targetDomain)
    }
  }, [isLoading, authToken])



  useEffect(() => {
    if (ensTextTarget) {
      console.log('ensTextTarget', ensTextTarget);
      document.cookie = `targetEncryptedHash=${ensTextTarget}; path=/;`;
    }
  }, [isEnsTextTargetLoading])



  const handleSignMessage = (targetDomain?: string) => {
    signMessageAsync({
      message: "MAGIC",
    })
      .then((signature) => {


        // console.log({ signature });

      });

  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="border-2 border-neutral rounded-md p-5">
        <h1 className="font-bold text-center mb-2 text-2xl">Geist Gateway</h1>
        <div className="text-xs mb-2">Identify yourself for preview...</div>
        <div className="text-sm font-bold">{targetDomain}</div>
        {
          true && (
            <>
              <span className="text-xs mr-2">Encrypted TXT</span>
              <div className="text-xs flex-wrap break-all text-gray-500">{ensTextTarget}</div>
              <span className="text-xs mr-2">Resolver</span>
              <a href={`https://sepolia.etherscan.io/address/${resolver}`} target="_blank" className="text-xs  text-gray-500">{resolver}</a>
            </>
          )
        }
        <div className="flex items-center justify-center my-3">
          <DynamicWidget />
        </div>

        {/* {isConnected && (
          <button
            className="cursor-pointer text-lg bg-primary text-primary-content border-2 rounded-md border-neutral py-2 w-full hover:bg-accent hover:text-accent-content"
            onClick={() => handleSignMessage(targetDomain)}
          >
            Sign and Preview
          </button>
        )} */}
        <button
          className="cursor-pointer text-lg bg-primary text-primary-content border-2 rounded-md border-neutral py-2 w-full hover:bg-accent hover:text-accent-content"
          disabled
        >
          Loading....
        </button>

      </div>
    </main>
  );
}

export default function PageWrapper(): JSX.Element {
  return (
    <Providers>
      <Page />
    </Providers>
  );
}

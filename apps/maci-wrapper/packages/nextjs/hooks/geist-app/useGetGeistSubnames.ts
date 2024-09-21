import { http, useAccount } from "wagmi";
import { addEnsContracts } from "@ensdomains/ensjs";
import { getSubnames } from "@ensdomains/ensjs/subgraph";
import { useQuery } from "wagmi/query";
import { createPublicClient } from "viem";

export function useGetGeistSubnames(parentName: string) {
  const { chain } = useAccount();

  return useQuery({
    queryKey: [chain?.id, parentName],
    queryFn: async () => {
      if (chain) {
        console.debug({ chainId: chain.id });
        const client = createPublicClient({
          chain: addEnsContracts(chain),
          transport: http(),
        });

        return await getSubnames(client, { name: parentName });
      }

      return [];
    },
  });
}

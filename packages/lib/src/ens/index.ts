
import { Chain, createWalletClient, custom, Hex, http, WalletClient } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { addEnsContracts } from '@ensdomains/ensjs'
import { setRecords } from '@ensdomains/ensjs/wallet'
import { createEnsPublicClient } from '@ensdomains/ensjs'

import { setResolver } from '@ensdomains/ensjs/wallet';
import { ChainWithBaseContracts } from '@ensdomains/ensjs/dist/types/contracts/consts'
import { privateKeyToAccount } from 'viem/accounts'

// https://docs.ens.domains/resolvers/interacting

    //  0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794
    const ENS_PRIVATE_KEY = process.env.ENS_PRIVATE_KEY;

 
    const NAME  = 'ethsg24.eth';

export const createClient = (chain: ChainWithBaseContracts = sepolia) =>{
    const client = createEnsPublicClient({
        chain,
        transport: http(),
      })

      return client;
}

export const setContenthash = async (contenthash: string)=>{

    const account = privateKeyToAccount(ENS_PRIVATE_KEY as Hex);

    console.log('account', account.address);
    const wallet = createWalletClient({
        account,
        chain: addEnsContracts(sepolia),
        transport: http(),
      })
    
    //   @ts-ignore
       const hash = await setRecords(wallet as never, {
        account,
        name: 'app.ethsg24.eth',
        // required
        resolverAddress: '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD', // Add the appropriate resolver address
        texts: [{ key: 'foo', value: 'bar' }],
    })

}

export const setDomainResolver = async (resolverAddress:string)=>{
    const account = privateKeyToAccount(ENS_PRIVATE_KEY as Hex);

    const wallet = createWalletClient({
        account,
        chain: addEnsContracts(sepolia),
        transport: http(),
      })



    const hash = await setResolver(wallet, {
        name: NAME,
        contract: 'registry',
        resolverAddress: '0x5a07C75Ae469Bf3ee2657B588e8E6ABAC6741b4f',
        account
      })

      console.log(hash);

    
}

export const setRecord = ()=>{
    // const hash = await setRecords(wallet as never, {
    //     name: 'ens.eth',
    //     coins: [
    //     {
    //         coin: 'ETH',
    //         value: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
    //     },
    //     ],
    //     texts: [{ key: 'foo', value: 'bar' }],
    //     resolverAddress: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
    // })


}



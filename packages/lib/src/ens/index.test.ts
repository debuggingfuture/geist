import { describe, expect, test } from 'vitest';

import { createClient, setDomainResolver } from './index';
import { mainnet } from 'viem/chains';

describe("ens", () => {

        // set owner first for testnet
    // fail at script, revert at etherscan 
    // https://sepolia.etherscan.io/tx/0xed3fb0a8d78e2992b67eb675d61c5b27a40cd7490c882f84c2aad6d6205a72b8
    test('#setDomainResolver', async ()=>{

        // original dns
        const resolverAddress = '0x5a07C75Ae469Bf3ee2657B588e8E6ABAC6741b4f';

        // public 0x8FADE66B79cC9f707aB26799354482EB93a5B7dD
        
        await setDomainResolver(resolverAddress);
    })



    test('#getAddress', async ()=>{
        const client = await createClient(mainnet);
        // const ethAddress = await client.getAddressRecord({ name: 'geist.network' });
        
        const result = await client.getAddressRecord({ name: 'debuggingfuture.eth' });
    
        expect(result!.value).toEqual('0x962EFc5A602f655060ed83BB657Afb6cc4b5883F')
    })

    test('#getAddress', async ()=>{
        const client = await createClient(mainnet);
        // const ethAddress = await client.getAddressRecord({ name: 'geist.network' });
        
        const result = await client.getResolver({ name: 'geist.network' });

        console.log('result', result)
    
    })

}, 60 * 1000);
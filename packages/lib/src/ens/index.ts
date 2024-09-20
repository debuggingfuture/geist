
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { addEnsContracts } from '@ensdomains/ensjs'
import { setRecords } from '@ensdomains/ensjs/wallet'

// https://docs.ens.domains/resolvers/interacting

export const setEnsResolver = async ()=>{
    //  0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794
    const ENS_PRIVATE_KEY = process.env.ENS_PRIVATE_KEY;

    const wallet = createWalletClient({
        chain: addEnsContracts(mainnet),
        transport: custom(),
    })
    
    const hash = await setRecords(wallet, {
        name: 'ens.eth',
        coins: [
        {
            coin: 'ETH',
            value: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
        },
        ],
        texts: [{ key: 'foo', value: 'bar' }],
        resolverAddress: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
    })
    
}
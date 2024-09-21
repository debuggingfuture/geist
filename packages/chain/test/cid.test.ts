import { generateCID } from '../src/lib/cid';

    describe("cid", () => {
        it("generate hash from content", async () => {
    
            const content = { hello: 'world' }
            const cidString = await generateCID(content)
            console.log('Generated CID:', cidString)
    
            
        })
    });
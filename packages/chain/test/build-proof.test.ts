import { fileURLToPath } from 'url';
import { processDirectory } from '../src/lib/build-proof';
import path from 'path';

    describe("cid", () => {
        it("generate hash from content", async () => {
            const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
            const __dirname = path.dirname(__filename); 
            console.log(__dirname);
            const dirPath = path.resolve(__dirname, './fixture');
            await processDirectory(dirPath);
    
            
            
        })
    });
import { fileURLToPath } from 'url';
import { processDirectory } from '../src/lib/build-proof';
import path from 'path';

    describe("#processDirectory", () => {
        it("generate hash from content", async () => {
            const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
            const __dirname = path.dirname(__filename); 
            console.log(__dirname);
            const dirPath = path.resolve(__dirname, './fixture');
            const inputMap = new Map<string, any>();

            const map = await processDirectory(dirPath, dirPath, inputMap);
    
            console.log(map.entries());

            expect(map.size).toBe(3);
            expect(map.get('file1.html')).toBe('bagaaierafj6cuub3raiezy5izih7oueoarjx7te5g73og7xn2akgxg2ndhxq');            
            expect(map.get('subdir1/file1.html')).toBe('bagaaieraiero4ygb67ev263r7zndvuhelukrprwetvl5gas52e5kgcqkriya');            
            expect(map.get('file2.html')).toBe('bagaaierabiylefhcnnlrpnmq4sbf3ep7s7po7cpguxkzvjocsfbyf25lfp6q');            
            
        })
    });
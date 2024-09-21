import fs from 'fs';
import { fileURLToPath } from 'url';
import { createFileProof, mapCidAsPoseidon, processDirectory } from '../src/lib/build-proof';
import path from 'path';
import { generateCID } from '../src/lib/cid';
import { CircuitString } from 'o1js';
import { loadDirname } from './util';
const __dirname = loadDirname();

    describe('#createFileProof', ()=>{
        it('create file proof', async ()=>{
            const dirPath = path.resolve(__dirname, './fixture');
            const inputMap = new Map<string, any>();

            const cidByFileKey = await processDirectory(dirPath, dirPath, inputMap);
            const { root, map} = createFileProof(cidByFileKey);

            const fileKey1 = CircuitString.fromString("file1.html").hash();
            // given a file
            const fileContent = fs.readFileSync(path.resolve(dirPath, 'file1.html'));
            const cid = await generateCID(fileContent);


            const witness = map.getWitness(fileKey1);
            const [rootComputed, key] = witness.computeRootAndKeyV2(
                mapCidAsPoseidon(
                    cid
                )    
            );

            key.assertEquals(fileKey1);

            rootComputed.assertEquals(map.getRoot());

        });
    })

    describe("#processDirectory", () => {
        it("generate hash from content", async () => {

            console.log(__dirname);
            const dirPath = path.resolve(__dirname, './fixture');
            const inputMap = new Map<string, any>();

            const map = await processDirectory(dirPath, dirPath, inputMap);
    
            console.log(map.entries());

            expect(map.size).toBe(3);
            expect(map.get('file1.html')).toBe('bagaaieraewvlwvzsjiykxufige6qb7yu33zfrbpdjz5pavq4ygcasoy4ut5a');            
            expect(map.get('subdir1/file1.html')).toBe('bagaaierapvoqklw7ai6je3q5qyxisvjzatwce5evcngay4fjyxuhh7xntw3a');            
            expect(map.get('file2.html')).toBe('bagaaieradxf6kne764nnkgljrsyk6zocgs4rduaywowbxbuzehjqdblcnkya');            
            
        })
    });
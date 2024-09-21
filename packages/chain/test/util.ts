import path from "path";
import { fileURLToPath } from "url";
import { createFileProof, processDirectory } from "../src/lib/build-proof";

export const loadDirname = ()=>{
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); 
    return __dirname;
}


export const createFixtureFileProof = async ()=>{
    const __dirname = loadDirname();
    console.log('__dirname', __dirname);
    const dirPath = path.resolve(__dirname, './fixture');
    const inputMap = new Map<string, any>();
  
    const cidByFileKey = await processDirectory(dirPath, dirPath, inputMap);
  

    return createFileProof(cidByFileKey);
  }
import path from 'path';
import { readdirSync } from "node:fs";
import { generateCID } from './cid';

export type BuildProofInputParams = {
    fileHashMap: Map<string, any>

}


export type RouteProofInputParams ={
    routes: string[]
}



export const processDirectory = async (dir: string): Promise<void> => {
    const entries = readdirSync(dir, {
      withFileTypes: true,
    });
  
    for (const entry of entries) {
      console.log('entry', entry)
      const fullPath = path.join(dir, entry.name);
  
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const cid = await generateCID(fullPath);
        console.log(`File: ${fullPath}, CID: ${cid}`);
      }
    }
  }
  
  


export const generateFileHash = ()=>{

}


export const createFileProof = ()=>{

}

export const createRouteProof = ()=>{

}

/**
 * wrap MACI proof
 */
export const createApporvalProof = ()=>{

}
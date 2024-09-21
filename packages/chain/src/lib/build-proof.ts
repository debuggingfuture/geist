import path from 'path';
import { readdirSync } from "node:fs";
import { generateCID } from './cid';

export type BuildProofInputParams = {
    fileHashMap: Map<string, any>

}


export type RouteProofInputParams ={
    routes: string[]
}



export const processDirectory = async (dir: string, root:string, map:Map<string, any>): Promise<Map<string, any>> => {
    const entries = readdirSync(dir, {
      withFileTypes: true,
    });
  
    for (const entry of entries) {
      console.log('entry', entry)
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath, root, map);
      } else if (entry.isFile()) {
        const buildPath = path.relative(root, path.resolve(entry.path, entry.name));
        const cid = await generateCID(fullPath);
        map.set(buildPath, cid);
        console.log(`add buildPath: ${buildPath}, CID: ${cid}`);
      }
    }
    
    return map;
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
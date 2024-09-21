import fs from 'fs';
import path from 'path';
import { readdirSync } from "node:fs";
import { generateCID } from './cid';
import { CircuitString, Field, MerkleList, MerkleMap } from 'o1js';

export type BuildProofInputParams = {
    fileHashMap: Map<string, any>

}


export type RouteProofInputParams ={
    routes: string[]
}



export const processDirectory = async (dir: string, rootDir:string, map:Map<string, any>): Promise<Map<string, any>> => {
    const entries = readdirSync(dir, {
      withFileTypes: true,
    });
  
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath, rootDir, map);
      } else if (entry.isFile()) {
        const buildPath = path.relative(rootDir, path.resolve(entry.path, entry.name));
        const cid = await generateCID(fs.readFileSync(fullPath));
        map.set(buildPath, cid);
        console.log(`add buildPath: ${buildPath}, CID: ${cid}`);
      }
    }
    
    return map;
}
  
// sha256 
export const mapCidAsPoseidon = (cid:string)=>{
  
  // https://docs.minaprotocol.com/zkapps/o1js/sha256
// let hash = Hash.Poseidon;
  return CircuitString.fromString(cid).hash();
}



export const createFileProof = (cidByFileKey: Map<string, string>)=>{
  const map = new MerkleMap();

  console.log('createFileProof for files:', cidByFileKey.size)
  console.log('cidByFileKey', cidByFileKey);
  for (const [key, value] of cidByFileKey.entries()) {
    const fileKey = CircuitString.fromString(key).hash();
    map.set(fileKey, mapCidAsPoseidon(value));
  };
  

  return {
    cidByFileKey,
    map,
    root: map.getRoot()
  };
}

export class RouteList extends MerkleList.create(CircuitString) {}

export const createRouteProof = (routes:string[])=>{

  const routeList = RouteList.empty();

  routes.forEach((route:string)=>{
    routeList.push(CircuitString.fromString(route));
  })

  return {
    routes,
    hash: routeList.hash,
  }

}

/**
 * wrap MACI proof
 */
export const createApporvalProof = ()=>{

  return Field.from(0n);

}

export const createFinalBuildProof = ({
  fileProof,
  routeProof,
  approvalProof
}:{
  fileProof: Field,
  routeProof: Field,
  approvalProof: Field
})=>{
  const map = new MerkleMap();

  map.set(CircuitString.fromString("fileProof").hash(), fileProof);
  map.set(CircuitString.fromString("routeProof").hash(), routeProof);
  map.set(CircuitString.fromString("approvalProof").hash(), approvalProof);

  return map.getRoot();
  

}
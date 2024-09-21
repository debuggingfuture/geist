// https://github.com/o1-labs/o1js/blob/main/src/examples/zkapps/merkle-tree/merkle-zkapp.ts

import { runtimeModule, state, runtimeMethod, RuntimeModule } from "@proto-kit/module";
import { State, assert } from "@proto-kit/protocol";
import { Balance,  TokenId } from "@proto-kit/library";
import { CircuitString, Field, MerkleMapWitness, MerkleTree, MerkleWitness, PublicKey } from "o1js";
import { mapCidAsPoseidon } from "../../lib/build-proof";

const treeHeight = 8;
// creates the corresponding MerkleWitness class that is circuit-compatible
export class BuildMerkleWitness extends MerkleWitness(treeHeight) {}



interface BuildConfig {
//   totalSupply: Balance;
        root: Field;
        witness: Field;
}

@runtimeModule()
export class Build extends RuntimeModule<BuildConfig> {

    @state() root = State.from<Field>(Field);

    @state() witness = State.from<BuildMerkleWitness>(BuildMerkleWitness);


  /**
   * Given a build, generated proof of routes, files etc
   * Commit approved build on chain
   * Only if build is aligning with it can be deployed
   * 
   * @param buildCommitment 
   */

  @runtimeMethod()
  public async init(buildCommitment: Field): Promise<void> {
    await this.root.set(buildCommitment);
    console.log('root updated', buildCommitment);
  }


  @runtimeMethod()
  public async verifySignature(
    tokenId: TokenId,
  ): Promise<void> {
  }

  @runtimeMethod()
  public async verifyFile(cidHash: Field, mapWitness: MerkleMapWitness){
      // we fetch the on-chain commitment
      let root = await this.root.get();

      const [rootComputed, key] = mapWitness.computeRootAndKeyV2(
        cidHash
        );
        
      console.log('key', key);
      console.log('root', root.value);
      console.log('rootComputed', rootComputed);
      assert(rootComputed.equals(root.value), 'root not equal');
   
  }
  
  @runtimeMethod()
  public async verifyBuild(
  ): Promise<void> {

    // do something
  }


  @runtimeMethod()
  public async deployBuild(
    tokenId: TokenId,
  ): Promise<void> {

    // do something

    await this.verifyBuild();



  }

}

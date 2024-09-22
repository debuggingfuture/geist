// https://github.com/o1-labs/o1js/blob/main/src/examples/zkapps/merkle-tree/merkle-zkapp.ts

import { runtimeModule, state, runtimeMethod, RuntimeModule } from "@proto-kit/module";
import { State, assert } from "@proto-kit/protocol";
import { Balance,  TokenId } from "@proto-kit/library";
import { CircuitString, Field, MerkleMapWitness, MerkleTree, MerkleWitness, PublicKey } from "o1js";
import { createFinalBuildProof, mapCidAsPoseidon } from "../../lib/build-proof";

const treeHeight = 8;
// creates the corresponding MerkleWitness class that is circuit-compatible
export class BuildMerkleWitness extends MerkleWitness(treeHeight) {}

interface BuildConfig {
      root: Field;
      fileProof: Field;
      routeProof: Field;
      approvalProof: Field;
      witness: Field;
}

@runtimeModule()
export class Build extends RuntimeModule<BuildConfig> {

    @state() root = State.from<Field>(Field);

    @state() fileProof = State.from<Field>(Field);

    @state() routeProof = State.from<Field>(Field);

    @state() approvalProof = State.from<Field>(Field);


  /**
   * Given a build, generated proof of routes, files and approval (from voting)
   * Only if build is aligning the commitment can it be deployed
   * 
   * To support more fine-grained verification, store individual profos
   * then generate final build commitment composed of all proofs
   * 
   * @param fileProof 
   * @param routeProof 
   * @param approvalProof 
   * 
   */

  @runtimeMethod()
  public async init(
    fileProof:Field,
    routeProof:Field,
    approvalProof: Field

  ): Promise<void> {
    const root = createFinalBuildProof({
      fileProof,
      routeProof,
      approvalProof
    })

    await this.fileProof.set(fileProof);
    await this.routeProof.set(routeProof);
    await this.approvalProof.set(approvalProof);
    await this.root.set(root);
    console.log('root updated', root);
  }

  @runtimeMethod()
  public async verifyFile(cidHash: Field, mapWitness: MerkleMapWitness){
      // we fetch the on-chain commitment
      let fileProof = await this.fileProof.get();

      const [rootComputed, key] = mapWitness.computeRootAndKeyV2(
        cidHash
        );
        
      assert(rootComputed.equals(fileProof.value), 'root not equal');
   
  }
  
  @runtimeMethod()
  public async verifyBuild(
      buildProof: Field,
  ): Promise<void> {
    let root = await this.root.get();

    assert(buildProof.equals(root.value), 'YOU SHALL NOT PASS!');

  }


  @runtimeMethod()
  public async deployBuild(
    buildProof: Field,
  ): Promise<void> {

    // do something

    await this.verifyBuild(buildProof);

    console.log('deploy the site');

    // generate signature for contract approval

  }

}

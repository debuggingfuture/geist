// https://github.com/o1-labs/o1js/blob/main/src/examples/zkapps/merkle-tree/merkle-zkapp.ts

import { runtimeModule, state, runtimeMethod, RuntimeModule } from "@proto-kit/module";
import { State, assert } from "@proto-kit/protocol";
import { Balance, Balances as BaseBalances, TokenId } from "@proto-kit/library";
import { MerkleTree, PublicKey } from "o1js";

// interface BalancesConfig {
//   totalSupply: Balance;
// }

@runtimeModule()
export class Build extends RuntimeModule<{}> {

  @state() public circulatingSupply = State.from<Balance>(Balance);


  @runtimeMethod()
  public async verifySignature(
    tokenId: TokenId,
  ): Promise<void> {
  }

  public async addBuild(){

    const treeHeight = 8;

        // creates a tree of height 8
        const Tree = new MerkleTree(treeHeight);

        // creates the corresponding MerkleWitness class that is circuit-compatible
        // class MyMerkleWitness extends MerkleWitness(treeHeight) {}

        // // sets a value at position 0n
        // Tree.setLeaf(0n, Field(123));

        // // gets the current root of the tree
        // const root = Tree.getRoot();

        // // gets a plain witness for leaf at index 0n
        // const witness = Tree.getWitness(0n);

        // // creates a circuit-compatible witness
        // const circuitWitness = new MyMerkleWitness(witness);

        // // calculates the root of the witness
        // const calculatedRoot = circuitWitness.calculateRoot(Field(123));

        // calculatedRoot.assertEquals(root);
  }
  
  @runtimeMethod()
  public async verifyBuild(
    tokenId: TokenId,
  ): Promise<void> {
  }
}

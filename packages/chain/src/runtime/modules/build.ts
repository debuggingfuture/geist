// https://github.com/o1-labs/o1js/blob/main/src/examples/zkapps/merkle-tree/merkle-zkapp.ts

import { runtimeModule, state, runtimeMethod, RuntimeModule } from "@proto-kit/module";
import { State, assert } from "@proto-kit/protocol";
import { Balance,  TokenId } from "@proto-kit/library";
import { CircuitString, Field, MerkleTree, MerkleWitness, PublicKey } from "o1js";

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

    //  @state() root2 = State.from<CircuitString>(CircuitString);

    // type error
    // @state() tree = State.from<MerkleTree>(MerkleTree);

    @state() witness = State.from<BuildMerkleWitness>(BuildMerkleWitness);


  @runtimeMethod()
  public async init(
  ): Promise<void> {


    // this.tree.set(Tree);
    // await this.root.set(Tree.getRoot());
    // await this.witness.set(new BuildMerkleWitness(Tree.getWitness(0n)));
  }

  // fromValue

  @runtimeMethod()
  public async verifySignature(
    tokenId: TokenId,
  ): Promise<void> {
  }

  public async addBuild(buildMetadata: any){


        // // sets a value at position 0n
        // this.root.set() setLeaf(0n, Field(123));
        this.root.set(Field(123));

        this.root.set(Field(234));


        // this.witness.set(new BuildMerkleWitness(Tree.getWitness(0n)));

        // Tree.setLeaf(1n, String("route1"));

        // this.root.set(String("route1"));
        // // gets the current root of the tree
        // const root = Tree.getRoot();

        // // gets a plain witness for leaf at index 0n
        // const witness = Tree.getWitness(0n);

        // // creates a circuit-compatible witness
        // const circuitWitness = new BuildMerkleWitness(witness);

        // // calculates the root of the witness
        // const calculatedRoot = circuitWitness.calculateRoot(Field(123));

        // calculatedRoot.assertEquals(root);
  }
  
  @runtimeMethod()
  public async verifyBuild(
    tokenId: TokenId,
  ): Promise<void> {

    // do something
  }
}

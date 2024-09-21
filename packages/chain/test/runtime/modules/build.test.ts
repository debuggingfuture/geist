import { TestingAppChain } from "@proto-kit/sdk";
import { CircuitString, Field, MerkleList, MerkleMap, MerkleMapWitness, MerkleTree, method, Poseidon, PrivateKey } from "o1js";
import { Build, BuildMerkleWitness } from "../../../src/runtime/modules/build";
import { log } from "@proto-kit/common";
import { BalancesKey, TokenId, UInt64 } from "@proto-kit/library";

class MyList extends MerkleList.create(CircuitString) {}

// class StringMerkleTree extends Struct(CircuitString) {}

log.setLevel("ERROR");

describe.only("build", () => {

  it('pure tree test', ()=>{
    
    const treeHeight = 8;
    const Tree = new MerkleTree(treeHeight);


    Tree.setLeaf(0n, Field(123));

    Tree.setLeaf(1n, Field(234));

    const root = Tree.getRoot();
    
    const witness = new BuildMerkleWitness(Tree.getWitness(0n));

    witness.calculateRoot(Field.from(123)).assertEquals(root);

    const witness2 = new BuildMerkleWitness(Tree.getWitness(1n));

    witness2.calculateRoot(Field.from(234)).assertEquals(root);

  })


  it('string based merkle list test', ()=>{

      // now use it
      let list1 = MyList.empty();
      let list2 = MyList.empty();

      [list1, list2]
      .map(list=>{
        list.push(CircuitString.fromString("/route1"));
        list.push(CircuitString.fromString("/route2"));
      });

      list1.hash.assertEquals(list2.hash);

  });

  it('string based merkle tree test', ()=>{
    
    const Map = new MerkleMap();

    const fileKey1 = CircuitString.fromString("file1").hash();
    const fileContent1 = CircuitString.fromString("content1").hash();
    const fileKey2 = CircuitString.fromString("file2").hash();
    const fileContent2 = CircuitString.fromString("content2").hash();
    // Poseidon("/route1").hash
    // https://docs.minaprotocol.com/zkapps/o1js/sha256#sha-256-and-poseidon

    Map.set(fileKey1, fileContent1);
    Map.set(fileKey2, fileContent2);

    const witness = Map.getWitness(fileKey1);
    const [root, key] = witness.computeRootAndKeyV2(fileContent1);

    root.assertEquals(Map.getRoot());

    key.assertEquals(fileKey1);

  })

  it("should demonstrate how build work", async () => {
    const appChain = TestingAppChain.fromRuntime({
      Build,
    });

    // appChain.configurePartial({
    //   Runtime: {
    //     Build: {
    //       root: Field.from(0),
    //       witness: Field.from(0),
    //       // totalSupply: UInt64.from(10000),
    //     },
    //     // seems always included
    //     Balances: {
    //       totalSupply: UInt64.from(10000),
    //     },
    //   },
    // });

    // await appChain.start();

    // const alicePrivateKey = PrivateKey.random();
    // const alice = alicePrivateKey.toPublicKey();
    // const tokenId = TokenId.from(0);

    // appChain.setSigner(alicePrivateKey);

    // const build = appChain.runtime.resolve("Build");

    // console.log('build', build);



    // const root = await appChain.query.runtime.Build.root.get();

    const buildMetadata = {
      routes :['/route1', '/route2'],
    }

    // // // gets a plain witness for leaf at index 0n
    // const witness = await appChain.query.runtime.Build.witness.get();

    
    // if(!root){
    //   throw new Error('root not found');
    // }

    // witness?.calculateRoot(Field.from(123)).assertEquals(root);



    // const tx1 = await appChain.transaction(alice, async () => {
    //   await build.addBuild(tokenId, alice, UInt64.from(1000));
    // });

    // await tx1.sign();
    // await tx1.send();

    // const block = await appChain.produceBlock();

    // const key = new BalancesKey({ tokenId, address: alice });
    // const balance = await appChain.query.runtime.Balances.balances.get(key);

    // expect(block?.transactions[0].status.toBoolean()).toBe(true);
    // expect(balance?.toBigInt()).toBe(1000n);
  }, 1_000_000);
});

import { TestingAppChain } from "@proto-kit/sdk";
import { CircuitString, Field, MerkleList, MerkleMap, MerkleMapWitness, MerkleTree, method, Poseidon, PrivateKey, PublicKey } from "o1js";
import { Build, BuildMerkleWitness } from "../../../src/runtime/modules/build";
import { log } from "@proto-kit/common";
import { BalancesKey, TokenId, UInt64 } from "@proto-kit/library";
import fs from "fs";
import path from "path";
import { createApporvalProof, createFinalBuildProof, createRouteProof, mapCidAsPoseidon, processDirectory } from "../../../src/lib/build-proof";
import { createFixtureFileProof, loadDirname } from "../../util";
import { generateCID } from "../../../src/lib/cid";

class MyList extends MerkleList.create(CircuitString) {}

const __dirname = loadDirname();

log.setLevel("ERROR");

const sendTx = async (signer:any, appChain: any, txFx: ()=>Promise<any>)=>{
    const tx = await appChain.transaction(signer, txFx);

    await tx.sign();
    await tx.send();
    const block = await appChain.produceBlock();

    console.log('tx sent, block status', block?.transactions[0].status.toBoolean())
    if(!block?.transactions[0].status.toBoolean()){
      console.log('block', block?.transactions)
      throw new Error(block?.transactions[0].statusMessage);
    }
}


describe("build", () => {

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


  describe('build proof', ()=>{
    let appChain:any;
    let signer:PublicKey;
    let build:Build;


    let fileProof:Field;
    let routeProof:Field;
    let approvalProof:Field;

    let fileMerkelMap:MerkleMap;

    beforeEach(async ()=>{
      appChain = TestingAppChain.fromRuntime({
        Build,
      });
  
      appChain.configurePartial({
        Runtime: {
          Build: {
            root: Field.from(0),
            fileProof : Field.from(0),
            routeProof: Field.from(0),
            approvalProof: Field.from(0),
            witness: Field.from(0)
          },
          // seems always included
          Balances: {
            totalSupply: UInt64.from(10000),
          },
        },
      });
      
      const alicePrivateKey = PrivateKey.random();
      const alice = alicePrivateKey.toPublicKey();
      signer = alice;
      
      await appChain.start();
      appChain.setSigner(alicePrivateKey);


      build = appChain.runtime.resolve("Build");


      // setup for buidl proof

      
      // setup from fixture
      const { map, root, cidByFileKey } = await createFixtureFileProof();
      fileProof = root;
      fileMerkelMap = map;

      const {hash} = createRouteProof(['/route1', '/route2']);
      
      routeProof = hash;
      approvalProof = createApporvalProof();

    // setup proofs
      await sendTx(signer, appChain, async ()=>{
        await build.init( fileProof, routeProof, approvalProof);
      })

    })

  it.only("should deploy fail without proof", async ()=>{
    
    const build = appChain.runtime.resolve("Build");

    expect(
      sendTx(signer, appChain, async ()=>{
          await build.deployBuild(Field.from(0));
      })
    ).rejects.toThrow('YOU SHALL NOT PASS!');
  })

  it.only("should deploy success with proof", async () => {

         
    const buildProof = createFinalBuildProof({
      fileProof,
      routeProof,
      approvalProof
    });

    const fileKey1 = CircuitString.fromString('file1.html').hash();
    const cidHash = fileMerkelMap.get(fileKey1);
    const fileWitness = fileMerkelMap.getWitness(fileKey1);

    const rootLatest = await appChain.query.runtime.Build.root.get();
    const fileProofLatest = await appChain.query.runtime.Build.fileProof.get();

    const [fileProofComputed, key] = fileWitness.computeRootAndKeyV2(
      cidHash   
    );

    fileProofComputed.assertEquals(fileProofLatest!);

    await sendTx(signer, appChain, async ()=>{
      await build.verifyFile(cidHash, fileWitness);
    });

    // await sendTx(signer, appChain, async ()=>{
    //   await build.deployBuild(buildProof);
    // });


  }, 1_000_000);
});
});

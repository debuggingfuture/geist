// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {OffchainResolver} from "../src/OffchainResolver.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_WALLET_PRIVATE_KEY");
        address deployerAddress = vm.rememberKey(deployerPrivateKey);
        console.log("deployer address", deployerAddress);
        vm.startBroadcast(deployerAddress);

        // https://docs.ens.domains/learn/deployments
        // sepolia
        address registrator = 0x5a07C75Ae469Bf3ee2657B588e8E6ABAC6741b4f;


        string memory url = "https://example.com";
        address[] memory signers = new address[](2);
        signers[0] = 0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794;
        signers[1] = 0x0987654321098765432109876543210987654321;

        // Deploy the OffchainResolver contract
        OffchainResolver resolver = new OffchainResolver(url, signers);







    }
}

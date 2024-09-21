// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console, console2} from "forge-std/Test.sol";
import {HybridResolver} from "../src/HybridResolver.sol";
import {IExtendedResolver} from "../src/IExtendedResolver.sol";

import {ContentHashResolver} from "../src/ContentHashResolver.sol";
import {TextResolver} from "../src/TextResolver.sol";


contract ResolverTest is Test {
    HybridResolver public resolver;

    function setUp() public {
        string memory url = "https://example.com";
        address[] memory signers = new address[](2);
        signers[0] = 0x1234567890123456789012345678901234567890;
        signers[1] = 0x0987654321098765432109876543210987654321;

        // Deploy the HybridResolver contract
        resolver = new HybridResolver(url, signers);


        resolver.setContenthash(bytes32("a.eth"), "0x123");

        resolver.setText(bytes32("a.eth"), "a", "b");
  
    }

    function testInterface(uint256 x) public view {
        bool result = resolver.supportsInterface(type(IExtendedResolver).interfaceId);
        assertEq(result, true); // IExtendedResolver
    }

    function testResolve(uint256 x) public view {

        string memory name = "a.eth";
        
        // bytes memory result = resolver.resolve(bytes(name), bytes("data"));
        // expect revert OffchainLookup
    }

    function testHash() public view {
        bytes memory result = resolver.contenthash(bytes32("a.eth"));

        assertEq(result, "0x123"); 
    }

    function testResolveHash() public view {
        bytes memory name = bytes("a.eth");

        // refers packages/contracts/test/TestHybridResolver.js
        bytes memory data = abi.encodeWithSelector(ContentHashResolver.contenthash.selector, name);
        bytes memory result = resolver.resolve(name, data);
        
        // no revert
        assertEq(result, "0x123"); 
        
    }


    
    function testResolveText() public view {
        bytes memory name = bytes("a.eth");

        string memory key = "a";
        string memory value = "b";

     

        bytes memory textCall = abi.encodeWithSelector(TextResolver.text.selector, name, key);
        bytes memory result = resolver.resolve(name, textCall);
        
        // no revert
        assertEq(result, bytes(value)); 
        
    }



}

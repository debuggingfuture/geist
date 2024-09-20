// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {OffchainResolver} from "../src/OffchainResolver.sol";
import {IExtendedResolver} from "../src/IExtendedResolver.sol";

contract ResolverTest is Test {
    OffchainResolver public resolver;

    function setUp() public {
        string memory url = "https://example.com";
        address[] memory signers = new address[](2);
        signers[0] = 0x1234567890123456789012345678901234567890;
        signers[1] = 0x0987654321098765432109876543210987654321;

        // Deploy the OffchainResolver contract
        resolver = new OffchainResolver(url, signers);

    }

    function testInterface(uint256 x) public view {
        bool result = resolver.supportsInterface(type(IExtendedResolver).interfaceId);
        assertEq(result, true); // IExtendedResolver
    }

    function testResolve(uint256 x) public view {

        string memory name = "a.eth";
        
        bytes memory result = resolver.resolve(bytes(name), bytes("data"));
        // expect revert
        // OffchainLookup
    }
}

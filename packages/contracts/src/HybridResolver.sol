// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ENS.sol";
import "@ensdomains/ens-contracts/contracts/resolvers/SupportsInterface.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "./ContentHashResolver.sol";
import "./TextResolver.sol";
import "./IExtendedResolver.sol";
import "./SignatureVerifier.sol";


interface IResolverService {
    function resolve(bytes calldata name, bytes calldata data) external view returns(bytes memory result, uint64 expires, bytes memory sig);
}


/**
 * Modified to include on-chain contenthash
 *
 * Implements an ENS resolver that directs all queries to a CCIP read gateway.
 * Callers must implement EIP 3668 and ENSIP 10.
 */
contract HybridResolver is ContentHashResolver, TextResolver, IExtendedResolver, SupportsInterface {

    string public url;
    mapping(address=>bool) public signers;
    address verifier;
    address trustedETHController;


    ENS immutable ens;

    event NewSigners(address[] signers);
    error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData);


    // Copied form PublicResolver.sol
    /**
     * A mapping of delegates. A delegate that is authorised by an owner
     * for a name may make changes to the name's resolver, but may not update
     * the set of token approvals.
     * (owner, name, delegate) => approved
     */
    mapping(address => mapping(bytes32 => mapping(address => bool)))
        private _tokenApprovals;



    // Logged when a delegate is approved or  an approval is revoked.
    event Approved(
        address owner,
        bytes32 indexed node,
        address indexed delegate,
        bool indexed approved
    );

        /**
     * @dev Approve a delegate to be able to updated records on a node.
     */
    function approve(bytes32 node, address delegate, bool approved) external {
        require(msg.sender != delegate, "Setting delegate status for self");

        _tokenApprovals[msg.sender][node][delegate] = approved;
        emit Approved(msg.sender, node, delegate, approved);
    }


    /**
     * @dev Approve a delegate to be able to updated records on a node.
     */
    function approveWithSignature(bytes32 node, address delegate, bytes32 messageHash, bytes memory signature) external {
        require(msg.sender != delegate, "Setting delegate status for self");
        require(SignatureChecker.isValidSignatureNow(verifier, messageHash, signature), "Invalid signature");
        _tokenApprovals[msg.sender][node][delegate] = true;
        emit Approved(msg.sender, node, delegate, true);
    }

    /**
     * @dev Check to see if the delegate has been approved by the owner for the node.
     */
    function isApprovedFor(
        address owner,
        bytes32 node,
        address delegate
    ) public view returns (bool) {
        return _tokenApprovals[owner][node][delegate];
    }

        /**
     * @dev See {IERC1155-isApprovedForAll}.
     */
    // function isApprovedForAll(
    //     address account,
    //     address operator
    // ) public view returns (bool) {
    //     return _operatorApprovals[account][operator];
    // }


    function isAuthorised(bytes32 node) internal view override returns (bool) {


        // simplified for this purpose
        if (
            msg.sender == trustedETHController
            //  ||
            // msg.sender == trustedReverseRegistrar
        ) {
            return true;
        }
        address owner = ens.owner(node);
        // if (owner == address(nameWrapper)) {
        //     owner = nameWrapper.ownerOf(uint256(node));
        // }
        return
            owner == msg.sender ||
            // isApprovedForAll(owner, msg.sender) ||
            isApprovedFor(owner, node, msg.sender);
    }


    constructor(
        ENS _ens,
        string memory _url, address[] memory _signers, address _verifier, address _trustedETHController) {
        ens = _ens;
        url = _url;
        for(uint i = 0; i < _signers.length; i++) {
            signers[_signers[i]] = true;
        }
        emit NewSigners(_signers);
        verifier = _verifier;
        trustedETHController = _trustedETHController;
    }

    function makeSignatureHash(address target, uint64 expires, bytes memory request, bytes memory result) external pure returns(bytes32) {
        return SignatureVerifier.makeSignatureHash(target, expires, request, result);
    }

    /**
     * For content hash, resolve on-chain
     * For others, resolve via gateway
     * Resolves a name, as specified by ENSIP 10.
     * @param name The DNS-encoded name to resolve.
     * @param data The ABI encoded data for the underlying resolution function (Eg, addr(bytes32), text(bytes32,string), etc).
     * @return The return data, ABI encoded identically to the underlying function.
     */
    function resolve(bytes calldata name, bytes calldata data) external override view returns(bytes memory) {

        bytes memory contenthashCall = abi.encodeWithSelector(ContentHashResolver.contenthash.selector, name);
        if (keccak256(data) == keccak256(contenthashCall)) {
            return this.contenthash(bytes32(name));
        }

        bytes32 selector;
        string memory key;

        (selector, key) = abi.decode(data[4:], (bytes32, string));

        bytes memory textCall = abi.encodeWithSelector(TextResolver.text.selector, name, key);
        if (keccak256(data) == keccak256(textCall)) {
            return bytes(this.text(bytes32(name), key));
        }


        bytes memory callData = abi.encodeWithSelector(IResolverService.resolve.selector, name, data);
        string[] memory urls = new string[](1);
        urls[0] = url;
        revert OffchainLookup(
            address(this),
            urls,
            callData,
            HybridResolver.resolveWithProof.selector,
            abi.encode(callData, address(this))
        );
    }

    /**
     * Callback used by CCIP read compatible clients to verify and parse the response.
     */
    function resolveWithProof(bytes calldata response, bytes calldata extraData) external view returns(bytes memory) {
        (address signer, bytes memory result) = SignatureVerifier.verify(extraData, response);
        require(
            signers[signer],
            "SignatureVerifier: Invalid sigature");
        return result;
    }

    function supportsInterface(bytes4 interfaceID) public pure override(TextResolver, ContentHashResolver, SupportsInterface) returns(bool) {
        return interfaceID == type(IExtendedResolver).interfaceId || super.supportsInterface(interfaceID);
    }
}

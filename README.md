
## 🤖 Geist

Decentralized Autonomous Website Builder.
DAO collaborate and vote builds, reduce trust assumptions of website deployment by introducing zk proofs and custom ENS resolver.


## What

Today, one can build a static website that is censorship resistent, decentralized by hosting it on IPFS, with resolution handled by ens domain. Websites can be updated via IPNS wiith immutable content trails and made persistent with IPFS pinnings. Great tools such as eth.limo and fleek made such approach user friendly.


Pairing with smart contract, we can create dApp comprised of UI and fully on-chain application states that benefit from security and governance mechanism of Ethereum.

A simple example is a static website that only visualize smart contract states, in a sense it works similar as a dynamic NFT. 

### Challenges of Autonomous websites



### Resolver routes


### Deployment flow

```mermaid
sequenceDiagram
    Verifier->>Verify Build
    Platform-> Upload IPFS
    Platform->>Contract: set record
    Platform-->>Contract: burn fuse
    Client->Wildcard resolver: Request
    Gateway->Response: Response
    

```



## How it works


### References
[ENSIP-7: Contenthash field](https://docs.ens.domains/ensip/7)

[ENSIP-10: Wildcard Resolution]

ERC-3668
https://eips.ethereum.org/EIPS/eip-3668#use-of-get-and-post-requests-for-the-gateway-interface



Brave deprecated ipfs://
https://github.com/brave/brave-browser/issues/37735


## Notes
### ENS contract address - testnet
https://docs.ens.domains/learn/deployments
https://github.com/ensdomains/ens-contracts/tree/staging/deployments/sepolia


### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.js`. This was chosen for several reasons:

- Make sharing one `tailwind.config.js` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.js` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

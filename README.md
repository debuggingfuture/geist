
## 🤖 Geist

Decentralized Autonomous Website Builder.
Wallet whitelist for Private Previews. Trustless Deployment after proposal voting. 

Make websites truely decentralize by remove trust assumptions in development & deployment, good bye to seat based pricing for collaborations. 
Allow DAOs to have private preview on websites collaborate and vote builds, reduce trust assumptions of website deployment by introducing zk proofs and custom ENS resolver.


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


### custom Hybrid resolver
-  we deployed a Hybrid resolver which is able to rresolve for both on off chain data


### custom whitelist
Trust assumption. The demo use non-decentralized infrastructure cloudflare worker for deployment, however that is good trade-off given it is only preview but not public websites. That could be replace by D1 compatabilie techstack such as tableland.


### Proof of Build

- Using Next.js static websites as an example, we can gather fingerprint from the build (under `/out` directory)
 - routes (`/route1` create route1.html)
 - file hashes (CID via multiformat package as used by ipfs)



redirect derypted ipfs hash

gateway can be switched and site is immutable


Brave deprecated ipfs://
https://github.com/brave/brave-browser/issues/37735


- Contracts Cloned from template https://github.com/ensdomains/offchain-resolver
- Fork 
https://github.com/debuggingfuture/ens-offchain-registrar


## Notes
### ENS contract address - testnet
https://docs.ens.domains/learn/deployments
https://github.com/ensdomains/ens-contracts/tree/staging/deployments/sepolia
#### Deploy Offchain resolver
- https://ccip.tools/

## cf workers logs
https://dash.cloudflare.com/c91d52c288c452ab734ede1518b00e11/workers/services/view/ens-gateway/production/logs/live

## Appchain
- run tests
  - `env-cmd pnpm --filter @repo/chain env:inmemory test`
- start the appchain, graphql
  - `env-cmd pnpm mina:env:inmemory --filter @repo/chain dev`
- start the demo app
  - `env-cmd pnpm mina:env:inmemory --filter @repo/mina-demo dev`

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

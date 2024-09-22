## 🤖 Geist

Geist is a Decentralized Autonomous Website (DAW) Builder.
Wallet Whitelist for Private Previews, Trustless zk-proof based deployment after DAO proposal voting, we allow DAOs to collaborate at scale and make the Internet more trustless.

## What
[ETHGlobal SG 24 Submission](https://ethglobal.com/showcase/geist-x3fur) | [Presentation](https://www.canva.com/design/DAGRQswuImw/flSJSrH9k9sLXKJd2LzeVg/edit?utm_content=DAGRQswuImw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)


Today, one can build a static dWebsite that is censorship resistent, decentralized by hosting it on IPFS, with resolution handled by ENS domain. Websites can be updated via IPNS wiith immutable content trails and made persistent with IPFS pinnings. Great tools such as eth.limo and fleek made such approach user friendly. Pairing with smart contract, we can create autonomous dApp comprised of UI and fully on-chain application states that benefit from security and governance mechanism of Ethereum.

As billions of websites are not decentralized today, we explore challenges and opportunites for making dWebsite greater and more autonomous.

We build Geist to support DAW by removing trust assumptions in development & deployment, add private previews to website and support anti collusion voting, so we can say good bye to seat-based pricing centralization tools and for DAO to collaborate at scale. 

## Challenges of DAW

### Lack of Privacy

IPFS has no content encryption and teams or DAOs always fallback to small trusted core team and centralized identity for collaboration.  
In particualr, private previews and review/voting on proposal are often essential for websites.

### WEB3 Identity unfriendly

Existing platforms such as Github, Vercel are hard to be utilized by large, diverse group of contributors, due to high seat-based pricing and lack of web3-identity (e.g. wallets/ens) based access control mechanisms. On-chain whitelist is often prohibitive due to inflexibility and cost.

### Privileged Access Everywhere
Websites deployment are subject to all sort of attack vectors, from DNS registrar, supply chain attack to various hosting concerns. Censorship resistance is not guarantee on hosted platforms and pipelines always require priviledged access.

We would like to bring on-chain security to make websites more autonomous, add guardrails and make changes more trackable?
We see a lot of use cases from DAW, from displaying censorship-sensitive key information, Whistle Bowling, Crowdfunding, Community Notes, Internet Archive to where fair mechanisms is in need such  Autonomous World or Advertisement.


## How it works

### Whitelist Gateway base on ENS for Private preview

We host websites preview on IPFS encrypted behind our gateway website. 
Users are required to visit gateway and sign with wallet to for access. With CCIP protocol, we deployed a Hybrid resolver which is able to resolve both on and off chain data. The resolver will resolve encrypted hash at TXT record of target domain and attach token to custom gateway for authentication. UI Gateway will redirect user given derypted ipfs hash response if user is whitelisted.


### Website proposal voting via MINA
- we use MACI to support users to decide which version of proposed website can be deployed.
- A zk proof on the tally results will be generated and can be associated with the build.

- we deployed a Hybrid resolver which is able to resolve both on and off chain data.
- source code of gateway is under `apps/worker`, originally maintained at separate forked repository [ens-offchain-registrar](https://github.com/debuggingfuture/ens-offchain-registrar)

### Trustless deployment via MINA based ZK Proofs

- Proof of Build is created for each website build
  - Using Next.js static websites as an example, we can gather fingerprint from the build (under `/out` directory) including
    - routes (`/route1` create route1.html)
    - file hashes (CID via multiformat package as used by ipfs)
    - MACI of proposal

- We use MINA chain to verify the build to be deployed is in line with proposal, by creating merkle map and and comparing against on-chain commitment

- In future, it is possible to further automate the trustless process once Protokit is able to roll up to L1 and the production EVM bridge is deployed.

## Notes

### ENS resolver contract
 - Contracts Cloned from template https://github.com/ensdomains/offchain-resolver
 - source code of gateway is under `apps/gateway`, originally maintained at separate forked repository [ens-offchain-registrar](
https://github.com/debuggingfuture/ens-offchain-registrar)

## Trust  assumptions
-  The demo use non-decentralized infrastructure cloudflare worker for deployment, however that is good trade-off given it is only preview but not final public websites. That could be replace by D1 compatabilie techstack such as tableland. Current fleek is used as ipfs gateway and to ease deployment & faster pinning, while it is not necessary as we could run own ipfs nodes



### ENS contract address - testnet

https://docs.ens.domains/learn/deployments
https://github.com/ensdomains/ens-contracts/tree/staging/deployments/sepolia

#### Deploy Offchain resolver

- https://ccip.tools/

## Cloudflare workers logs

- start
  - `env-cmd pnpm run --filter @repo/gateway dev`
- deploy

  - `env-cmd pnpm run --filter @repo/gateway deploy`

- Check [Logs](https://dash.cloudflare.com/c91d52c288c452ab734ede1518b00e11/workers/services/view/ens-gateway/production/logs/live)


### References
- [ENSIP-7: Contenthash field](https://docs.ens.domains/ensip/7)
- [ENSIP-10: Wildcard Resolution]
- [ERC-3668](https://eips.ethereum.org/EIPS/eip-3668#use-of-get-and-post-requests-for-the-gateway-interface)
- [Brave deprecated ipfs://](https://github.com/brave/brave-browser/issues/37735)

## Appchain

- run tests
  - `env-cmd pnpm --filter @repo/chain env:inmemory test`
- start the appchain, graphql
  - `env-cmd pnpm mina:env:inmemory --filter @repo/chain dev`
- start the demo app
  - `env-cmd pnpm mina:env:inmemory --filter @repo/mina-demo dev`

## MACI Build Voting System

- `pnpm i` on the root directory.
- `pnpm i` on the `maci-wrapper` directory.
- `pnpm run dev` to run.
- To generate the proofs, you can refer to MACI's [official documentation](https://maci.pse.dev/docs/quick-start/poll-finalization)

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `wrapper-site`: implementation of geist gateway.
- `fun-site`: play around with them!
- `maci-wrapper`: for the implementation of the build voting system based on the [recommended wrapper app](https://github.com/yashgo0018/maci-wrapper) by the official MACI documentation
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

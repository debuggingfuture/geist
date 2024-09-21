import { Balance, VanillaRuntimeModules } from "@proto-kit/library";
import { ModulesConfig } from "@proto-kit/common";

import { Balances } from "./modules/balances";
import { Build } from "./modules/build";

export const modules = VanillaRuntimeModules.with({
  Balances,
  Build
});

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: Balance.from(10_000),
  },
  // Build: {
    
  // }
};

export default {
  modules,
  config,
};

import { Balance, VanillaRuntimeModules } from "@proto-kit/library";
import { ModulesConfig } from "@proto-kit/common";

import { Balances } from "./modules/balances";
import { Build } from "./modules/build";
import { Field } from "o1js";

export const modules = VanillaRuntimeModules.with({
  Balances,
  Build
});

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: Balance.from(10_000),
  },
  Build: {
    root: Field.from(0),
    witness: Field.from(0),
  }
};

export default {
  modules,
  config,
};

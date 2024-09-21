/* eslint-disable jsx-a11y/anchor-is-valid -- disable href for daisy ui tabs*/
import Badge from "@repo/ui/badge";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col gap-6 justify-between px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dancing Storm Trooper</h1>

        {/* Tabs */}
        <div
          className="tabs tabs-boxed border-2 border-neutral border-solid bg-base"
          role="tablist"
        >
          <a className="tab tab-active" role="tab">
            Overview
          </a>
          <a className="tab" role="tab">
            Proposals
          </a>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="border-2 border-neutral border-solid p-3 rounded-md">
          <h1 className="font-bold text-lg pb-2 border-b-neutral border-b">
            Overview
          </h1>

          <div className="flex flex-col gap-2 mt-3">
            <div className="flex justify-between items-center">
              <div className="font-semibold mr-6">Production ENS Name</div>
              <div>stormtrooper.geist.eth</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-semibold  mr-6">IPFS Hash</div>
              <div>ipfs://12125121223</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-semibold  mr-6">Organization</div>
              <div>Nouns DAO</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-semibold  mr-6">Created</div>
              <div>25 September 2024</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-semibold  mr-6">Status</div>
              <div>
                <Badge color="success" size="lg" text="Live" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-semibold  mr-6">
                Voting Period for Updates
              </div>
              <div>25 September 2024 - 30 September 2024</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-semibold  mr-6">Coordinator Address</div>
              <div>0x9aa...568</div>
            </div>
          </div>
        </div>
        <div className="border-2 border-neutral border-solid p-3 rounded-md flex-1">
          <h1 className="font-bold text-lg pb-2 border-b-neutral border-b">
            History of Changes
          </h1>
          <div className="border-2 border-neutral border-solid p-3 rounded-md mt-3">
            <div className="flex justify-between items-center">
              <h2 className="text-md">Add 1000 Stormtroopers</h2>
              <div className="text-neutral-400">20 September 2024</div>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <div className="text-neutral-400  text-sm">Proposed by</div>
              <div className="font-bold text-primary">0x42...1ab2</div>
            </div>
          </div>
          <div className="border-2 border-neutral border-solid p-3 rounded-md mt-3">
            <div className="flex justify-between items-center">
              <h2 className="text-md">Add 1000 Stormtroopers</h2>
              <div className="text-neutral-400">20 September 2024</div>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <div className="text-neutral-400 text-sm">Proposed by</div>
              <div className="font-bold text-primary">0x42...1ab2</div>
            </div>
          </div>
          <div className="border-2 border-neutral border-solid p-3 rounded-md mt-3">
            <div className="flex justify-between items-center">
              <h2 className="text-md">Add 1000 Stormtroopers</h2>
              <div className="text-neutral-400">20 September 2024</div>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <div className="text-neutral-400  text-sm">Proposed by</div>
              <div className="font-bold text-primary">0x42...1ab2</div>
            </div>
          </div>
          <div className="border-2 border-neutral border-solid p-3 rounded-md mt-3">
            <div className="flex justify-between items-center">
              <h2 className="text-md">Add 1000 Stormtroopers</h2>
              <div className="text-neutral-400">20 September 2024</div>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <div className="text-neutral-400  text-sm">Proposed by</div>
              <div className="font-bold text-primary">0x42...1ab2</div>
            </div>
          </div>
          <div className="border-2 border-neutral border-solid p-3 rounded-md mt-3">
            <div className="flex justify-between items-center">
              <h2 className="text-md">Add 1000 Stormtroopers</h2>
              <div className="text-neutral-400">20 September 2024</div>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <div className="text-neutral-400  text-sm">Proposed by</div>
              <div className="font-bold text-primary">0x42...1ab2</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

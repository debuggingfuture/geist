"use client";

/* eslint-disable jsx-a11y/anchor-is-valid -- disable href for daisy ui tabs*/
import Link from "next/link";
import { useGetGeistSubnames } from "~~/hooks/geist-app/useGetGeistSubnames";
import { useRouter } from "next/navigation";

const siteNames = [
  "Replace the site with a funding demo",
  "You wanna see someone dancing?",
  "Change some fonts to be bigger",
];

export default function Page({ params: { address } }: { params: { address: string } }): JSX.Element {
  const { data: subNames, isLoading } = useGetGeistSubnames("ethsg24.eth");
  const router = useRouter();

  return (
    <main className="flex flex-col gap-6 justify-between px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ETH-SG 24</h1>

        {/* Tabs */}
        <div className="tabs tabs-boxed border-2 border-neutral border-solid bg-base" role="tablist">
          <Link className="tab" role="tab" href={`/geist-app/site/${address}`}>
            Overview
          </Link>
          <Link className="tab tab-active" role="tab" href="#">
            Proposals
          </Link>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="border-2 border-neutral border-solid p-3 rounded-md flex-1">
          <h1 className="font-bold text-lg pb-2 border-b-neutral border-b">Proposals to Vote</h1>

          {isLoading ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : (
            subNames.map((subName, index) => {
              console.debug({ subName });
              return (
                <div className="border-2 border-neutral border-solid p-3 rounded-md mt-3" key={index}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg">{siteNames[index]}</h2>
                  </div>
                  <div className="flex justify-end w-full items-center mt-1">
                    <div className="flex gap-3 items-center">
                      <button
                        className="btn btn-outline btn-sm border-neutral border-2"
                        onClick={() => window.open(`https://${subName.name}`, "_blank")}
                      >
                        Preview
                      </button>
                      <button className="btn btn-primary btn-sm border-2 border-neutral hover:bg-accent hover:text-accent-content">
                        Vote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* <div className="border-2 border-neutral border-solid p-3 rounded-md mt-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">You wanna see someone dancing ?</h2>
            </div>
            <div className="flex justify-end w-full items-center mt-1">
              <div className="flex gap-3 items-center">
                <button className="btn btn-outline btn-sm border-neutral border-2">Preview</button>
                <button className="btn btn-primary btn-sm border-2 border-neutral hover:bg-accent hover:text-accent-content">
                  Vote
                </button>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="border-2 border-neutral border-solid p-3 rounded-md">
          <h1 className="font-bold text-lg pb-2 border-b-neutral border-b">Voting Status</h1>

          <div className="flex flex-col gap-2 mt-3">
            <div className="flex justify-between items-center">
              <div className="font-semibold  mr-6">Voting Period for Updates</div>
              <div>25 September 2024 - 30 September 2024</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-semibold  mr-6">Coordinator Address</div>
              <div>0x9aa...568</div>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}

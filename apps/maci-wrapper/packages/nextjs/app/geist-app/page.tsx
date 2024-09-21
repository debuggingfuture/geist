"use client";

import { SITE_DATA } from "~~/constants/site-data";

function AutonomousSiteCard({ name, ensName }: { name: string; ensName: string }): JSX.Element {
  return (
    <div className="flex flex-col border-2 border-neutral border-solid p-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-content">
      <div className="text-xl font-semibold">{name}</div>
      <div className="divider my-1" />
      <div className="text-sm">{ensName}</div>
    </div>
  );
}

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col gap-6 justify-between px-6">
      <h1 className="text-3xl font-bold">Autonomous Sites</h1>
      <div className="grid grid-cols-3 gap-5">
        {SITE_DATA.map(siteData => (
          <AutonomousSiteCard ensName={siteData.ensName} key={siteData.ensName} name={siteData.name} />
        ))}
      </div>
    </main>
  );
}

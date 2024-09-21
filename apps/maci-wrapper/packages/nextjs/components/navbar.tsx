import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export function Navbar(): JSX.Element {
  return (
    <div className="px-6 flex justify-between items-center w-full" style={{ paddingTop: 16, paddingBottom: 16 }}>
      <div className="font-bold">Geist.</div>
      <DynamicWidget />
    </div>
  );
}

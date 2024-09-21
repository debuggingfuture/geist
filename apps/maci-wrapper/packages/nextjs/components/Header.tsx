"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  // {
  //   label: "Debug Contracts",
  //   href: "/debug",
  //   icon: <BugAntIcon className="h-4 w-4" />,
  // },
];

const adminPageLink: HeaderMenuLink = {
  label: "Admin",
  href: "/admin",
};

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  const { address } = useAccount();

  const { data: owner } = useScaffoldContractRead({ contractName: "MACIWrapper", functionName: "owner" });

  return (
    <>
      {[...menuLinks, ...(address === owner ? [adminPageLink] : [])].map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="bg-white">
      <div className="navbar-end flex-grow mr-4">
        <DynamicWidget />
      </div>
    </div>
  );
};

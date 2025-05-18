import React from "react";
import Image from 'next/image';
import ConnectButton from "@/app/components/ConnectButton";
import Link from 'next/link';
import DarkModeSwitcher from "@/app/components/DarkModeSwitcher";

export default function Header() {

  return (
    <header className={'header'}>
      <Link href="/">
        <div
          className={'logo'}>
          <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="Logo"
          />
          <div className={'logo-text'}>SWAP MASTER</div>
        </div>
      </Link>
      <div className={'flex flex-wrap justify-between w-full'}>
        <nav className={'nav text pt-[24px] pb-[16px] flex pr-[80px]'}>
          <ul className={'flex flex-wrap items-center gap-[40px]'}>
            <li>
              <Link href="/create">Создание смарт-контракта</Link>
              <ul>
                <Link href="/create/simple-contract">
                  <li>Создание простого смарт-контракта</li>
                </Link>
              </ul>
            </li>
            <Link href="/me">
              <li>Мои смарт-контракты</li>
            </Link>
          </ul>
        </nav>
        <div className={'flex items-center gap-[32px] pr-[32px]'}>
          <div className={'px-[16px]'}>
            <ConnectButton/>
          </div>
          <DarkModeSwitcher/>
          {/*<div className={'button'}>REGISTER</div>*/}
          {/*<Image*/}
          {/*  src="/svg/settings.svg"*/}
          {/*  width={24}*/}
          {/*  height={24}*/}
          {/*  alt="Settings"*/}
          {/*  className={'cursor-pointer gear svg'}*/}
          {/*/>*/}
        </div>
      </div>
    </header>
  );
}
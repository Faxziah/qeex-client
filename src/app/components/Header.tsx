import React from "react";
import Image from 'next/image';
import ConnectButton from "@/app/components/ConnectButton";
import Link from 'next/link';


export default function Header() {

  return (
    <header className={'px-[80px] flex gap-[70px]'}>
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
            <li><span>Создание контракта</span>
              <ul>
                <Link href="/create">
                  <li>Создание простого контракта</li>
                </Link>
              </ul>
            </li>
            <Link href="/me">
              <li>Мои контракты</li>
            </Link>
            {/*<li>Develop</li>*/}
            {/*<li>Community</li>*/}
            {/*<li>Blog</li>*/}
          </ul>
        </nav>
        <div className={'flex items-center gap-[32px] pr-[32px]'}>
          <ConnectButton/>
          {/*<div className={'button'}>REGISTER</div>*/}
          {/*<Image*/}
          {/*  src="/svg/settings.svg"*/}
          {/*  width={24}*/}
          {/*  height={24}*/}
          {/*  alt="Settings"*/}
          {/*  className={'cursor-pointer gear'}*/}
          {/*/>*/}
        </div>
      </div>
    </header>
  );
}
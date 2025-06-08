'use client';

import React, {useState} from "react";
import Image from 'next/image';
import ConnectButton from "@/app/components/ConnectButton";
import Link from 'next/link';
import DarkModeSwitcher from "@/app/components/DarkModeSwitcher";
import "@/app/styles/header.css";

export default function Header() {

  const [isMenuOpened, setIsMenuOpened] = useState(false)

  function showMenu() {
    setIsMenuOpened(true)
  }

  function closeMenu() {
    setIsMenuOpened(false)
  }

  const getHamburgerClassName = (menuOpened: boolean) => {
    return `svg xl:hidden ${menuOpened ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`;
  };

  const getCrossClassName = (menuOpened: boolean) => {
    return `svg xl:hidden ${menuOpened ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`;
  };

  return (
    <header className={`header flex-wrap`}>
      <Link href="/" className={'order-2 xl:order-1'}>
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
      <nav className={`nav text md:pt-[24px] md:pb-[16px] order-2 xl:order-1 xl:flex ${isMenuOpened ? 'order-4 basis-full pr-0' : 'hidden pr-[80px]'}`}>
        <ul className={`flex flex-wrap items-center  flex-col xl:flex-row ${isMenuOpened ? 'gap-[15px]' : 'gap-[40px]'}`}>
          <li>
            <Link href="/create/simple-contract">Создание смарт-контракта</Link>
            <ul>
              <Link href="/create/simple-contract">
                <li>Создание простого смарт-контракта</li>
              </Link>
              <Link href="/create/cryptocurrency">
                <li>Создание криптовалюты</li>
              </Link>
              <Link href="/create/nft">
                <li>Создание NFT Токена</li>
              </Link>
            </ul>
          </li>
          <Link href="/me">
            <li>Мои смарт-контракты</li>
          </Link>
        </ul>
      </nav>
      <div className="relative w-[45px] h-[45px] xl:hidden">
        <Image
          src="/svg/hamburger.svg"
          width={45}
          height={45}
          className={`${getHamburgerClassName(isMenuOpened)} transition-opacity duration-500 absolute top-0 left-0`}
          alt="hamburger menu"
          onClick={showMenu}
        />
        <Image
          src="/svg/cross.svg"
          width={45}
          height={45}
          className={`${getCrossClassName(isMenuOpened)} transition-opacity duration-500 absolute top-0 left-0`}
          alt="cross menu"
          onClick={closeMenu}
        />
      </div>
      <div className={`items-center gap-[32px] pr-[32px] order-3 justify-center ${isMenuOpened ? 'basis-full flex' : 'hidden'} md:flex md:basis-auto`}>
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
    </header>
  );
}
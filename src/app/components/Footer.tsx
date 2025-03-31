import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

  return (
    <footer className={'footer'}>
      <div className={'footer-columns'}>
        <div className={'footer-column'}>
          <p>О нас</p>
          <ul>
            <li><Link href={'#'}>О нас</Link></li>
            <li><Link href={'#'}>FAQ</Link></li>
            {/*<li><Link href={'#'}>Projects</Link></li>*/}
          </ul>
        </div>
        <div className={'footer-column'}>
          <p>Контакты</p>
          <ul>
            <li><Link href={'#'}>Контакты</Link></li>
            {/*<li><Link href={'#'}>Контакты</Link></li>*/}
          </ul>
        </div>
      </div>
      {/*<div className={'footer-column'}>*/}
      {/*  <p>Социальные сети</p>*/}
      {/*  <ul className={'social-media'}>*/}
      {/*    <li>*/}
      {/*      <Link href={'#'}>*/}
      {/*        <Image*/}
      {/*          src="/svg/social-media/instagram.svg"*/}
      {/*          width={32}*/}
      {/*          height={32}*/}
      {/*          alt="Light mode"*/}
      {/*          className={'svg'}*/}
      {/*        />*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link href={'#'}>*/}
      {/*        <Image*/}
      {/*          src="/svg/social-media/facebook.svg"*/}
      {/*          width={32}*/}
      {/*          height={32}*/}
      {/*          alt="Light mode"*/}
      {/*          className={'svg'}*/}
      {/*        />*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link href={'#'}>*/}
      {/*        <Image*/}
      {/*          src="/svg/social-media/telegram.svg"*/}
      {/*          width={32}*/}
      {/*          height={32}*/}
      {/*          alt="Light mode"*/}
      {/*          className={'svg'}*/}
      {/*        />*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </footer>
  );
}
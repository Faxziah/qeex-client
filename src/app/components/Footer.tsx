import React from "react";
import Image from "next/image";
import Link from "next/link";

import "@/app/styles/footer.css";

export default function Footer() {

  return (
    <footer className={'footer'}>
      <div className={'footer-left'}>
        <div className={'footer-column'}>
          <p>Дополнительная информация</p>
          <ul>
            <li><Link href={'/#contracts-type-container'}>Виды смарт-контрактов</Link></li>
            <li><Link href={'/#faq-container'}>FAQ</Link></li>
            {/*<li><Link href={'#'}>Projects</Link></li>*/}
          </ul>
        </div>
        {/*<div className={'footer-column'}>*/}
        {/*  <p>Контакты</p>*/}
        {/*  <ul>*/}
        {/*    <li><Link href={'#'}>Контакты</Link></li>*/}
        {/*    /!*<li><Link href={'#'}>Контакты</Link></li>*!/*/}
        {/*  </ul>*/}
        {/*</div>*/}
      </div>
      <div className={'footer-right'}>
        <div className={'footer-column'}>
          <p>Социальные сети</p>
          <ul className={'social-media'}>
            <li>
              <Link href={'#'}>
                <Image
                  src="/svg/social-media/instagram.svg"
                  width={32}
                  height={32}
                  alt="Light mode"
                  className={'svg'}
                />
              </Link>
            </li>
            <li>
              <Link href={'#'}>
                <Image
                  src="/svg/social-media/facebook.svg"
                  width={32}
                  height={32}
                  alt="Light mode"
                  className={'svg'}
                />
              </Link>
            </li>
            <li>
              <Link href={'#'}>
                <Image
                  src="/svg/social-media/telegram.svg"
                  width={32}
                  height={32}
                  alt="Light mode"
                  className={'svg'}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
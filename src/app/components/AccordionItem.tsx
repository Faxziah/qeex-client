'use client';

import {useState} from 'react';
import Image from "next/image";

import "@/app/styles/accordion.css";

interface AccordionItem {
  title: string;
  content: string;
}

const AccordionItem = ({title, content}: AccordionItem) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item" onClick={() => setIsActive(!isActive)}>
      <div className="accordion-title">
        <p className={'text'}>{title}</p>
        <div>
          <Image
            src={'/svg/arrow-down.svg'}
            width={12}
            height={12}
            alt={'Arrow down'}
            className={`svg ${isActive ? 'active' : ''}`}
          />
        </div>
      </div>
      <div className={`accordion-content ${isActive ? 'active' : ''}`}>
        <div className="content-inner">{content}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
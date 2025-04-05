'use client';

import {createContext, useContext, useState, ReactNode} from "react";
import Modal from "@/app/components/Modal";
import {voidFunction} from "@/app/helpers/voidFunction";

interface ModalContextProps {
  showModal: (
    title: string,
    content?: ReactNode,
    type?: 'error' | 'warning' | 'success',
    onCloseAction?: () => void,
    onConfirmAction?: () => void,
    dangerouslySetInnerHTML?: boolean,
  ) => void;

  showModalError: (
    content?: ReactNode,
    onCloseAction?: () => void,
    onConfirmAction?: () => void,
    dangerouslySetInnerHTML?: boolean,
  ) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({children}: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>(null);
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | undefined>(undefined);
  const [onCloseAction, setOnCloseAction] = useState<(() => void) | undefined>(undefined);
  const [dangerouslySetInnerHTML, setDangerouslySetInnerHTML] = useState<boolean>(false);
  const [type, setType] = useState<'error' | 'warning' | 'success' | 'pencil' | undefined>(undefined);

  function showModal(
    title: string,
    content?: ReactNode,
    type?: 'error' | 'warning' | 'success' | 'pencil',
    onCloseAction?: () => void,
    onConfirmAction?: () => void,
    dangerouslySetInnerHTML: boolean = false,
  ) {
    setTitle(title);
    setContent(content);
    setOnCloseAction(() => onCloseAction);
    setOnConfirmAction(() => onConfirmAction);
    setIsOpen(true);
    setDangerouslySetInnerHTML(dangerouslySetInnerHTML);
    setType(type);
  }

  function showModalError(
    content?: ReactNode,
    onCloseAction?: () => void,
    onConfirmAction?: () => void,
    dangerouslySetInnerHTML: boolean = false,
  ) {
    setTitle('Ошибка');
    setContent(content);
    setOnCloseAction(() => onCloseAction);
    setOnConfirmAction(() => onConfirmAction);
    setIsOpen(true);
    setDangerouslySetInnerHTML(dangerouslySetInnerHTML);
    setType('error');
  }

  function closeModal() {
    if (onCloseAction) {
      onCloseAction();
    }

    setIsOpen(false);
    setTitle('');
    setContent('');

    setOnConfirmAction(voidFunction);
    setOnCloseAction(voidFunction);
  }

  return (
    <ModalContext.Provider value={{showModal, showModalError}}>
      {children}
      <Modal isOpen={isOpen} title={title} type={type} onCloseAction={closeModal} onConfirmAction={onConfirmAction}>
        {dangerouslySetInnerHTML ? <div dangerouslySetInnerHTML={{__html: content as string}}/> : content}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext) as ModalContextProps;
}

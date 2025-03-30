'use client';

import React, {useEffect} from "react";
import Image from "next/image";
import {voidFunction} from "@/app/helpers/voidFunction";

interface ModalProps {
  isOpen: boolean;
  title: string;
  type?: 'error' | 'warning' | 'success' | 'pencil';
  onCloseAction: () => void;
  onConfirmAction?: () => void;
  children: React.ReactNode;
}

const modalIconsPath = {
  error: '/svg/error.svg',
  warning: '/svg/warning.svg',
  success: '/svg/success.svg',
  pencil: '/svg/pencil.svg',
};

export default function Modal({isOpen, title, type, onCloseAction, onConfirmAction, children}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseAction();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCloseAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true" onClick={onCloseAction}></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <div
          className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-1/2">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
                {type && modalIconsPath[type] ?
                  <Image
                    src={modalIconsPath[type]}
                    width={32}
                    height={32}
                    alt="Modal icon"
                  />
                  : null}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-base font-semibold text-gray-900" id="modal-title">{title}</h3>
                <div className="mt-2 text-sm text-gray-500 pt-4">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {onConfirmAction && onConfirmAction !== voidFunction ? (
              <button onClick={onConfirmAction} type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto cursor-pointer">
                Подтвердить
              </button>
            ) : null}
            <button onClick={onCloseAction} type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

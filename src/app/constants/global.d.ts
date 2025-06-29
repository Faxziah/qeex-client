import {MetaMaskInpageProvider} from "@metamask/providers";
import 'react';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       *
       * The AppKit button web component. Registered globally by AppKit.
       */
      'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Ensures file is treated as a module
export {};
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // more env variables...
    VITE_PUBLIC_CMS_ENPOINT: string
    VITE_PREVIEW_API_CMS_ENPOINT: string
    VITE_PUBLIC_TOKEN_SECRET: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
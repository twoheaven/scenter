interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
  readonly VITE_AWS_ACCESS_KEY: string;
  readonly VITE_AWS_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

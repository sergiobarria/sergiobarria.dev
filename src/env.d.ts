/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly DATABASE_HOST: string;
    readonly DATABASE_USERNAME: string;
    readonly DATABASE_PASSWORD: string;
    readonly XATA_API_KEY: string;
    readonly XATA_BRANCH?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

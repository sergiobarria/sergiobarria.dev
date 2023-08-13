/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />

interface ImportMetaEnv {
    readonly DATABASE_HOST: string
    readonly DATABASE_USERNAME: string
    readonly DATABASE_PASSWORD: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

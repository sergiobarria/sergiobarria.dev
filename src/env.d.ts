/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly XATA_API_KEY: string;
    readonly XATA_BRANCH?: string;
    readonly SPOTIFY_REFRESH_TOKEN: string;
    readonly SPOTIFY_CLIENT_SECRET: string;
    readonly GITHUB_ACCESS_TOKEN: string;
    readonly SPOTIFY_CLIENT_ID: string;
    readonly WAKATIME_API_KEY: string;
    readonly WAKATIME_USER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

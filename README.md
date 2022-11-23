![Logo](https://res.cloudinary.com/sbarria-dev/image/upload/v1669242055/sergiobarria/banners/repo-cover_sdlb8e.png)

<p align="center">
  <img src="https://img.shields.io/apm/l/atomic-design-ui.svg?" />
  <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />
  <img src="https://github.com/sergiobarria/sergiobarria.com/actions/workflows/cypress.yml/badge.svg?branch=main" />
</p>

# sergiobarria.com (With Astro)

This is my personal website, blog and portfolio showcase. Built with Astro, Vercel Functions and SCSS. Written using TypeScript and content managed with MDX.

## Overview

Previously my website was built with Next.js, but I wanted to try Astro, so I decided to rebuild it from scratch. I'm using Vercel Functions to handle API requests and communication with different platforms. I'm also using Cloudinary to store the images.

## Files and Folders Structure

```
.
├── api
├── lib
├── plugins
├── public
├── src/
│   ├── content
│   ├── layouts
│   ├── pages
│   ├── shared
│   ├── stores
│   └── styles
└── ...(other root files)
```

### Explanation

- `api`: Contains the Vercel Functions.
- `lib`: Contains the different functions used in the project.
- `plugins`: Contains the different speciffic plugins used by Astro in this project.
- `public`: Contains the different static files used in the project.
- `src`: Contains source files used in the project.
  - `content`: Contains MDX files used in the project.
  - `layouts`: Contains layouts used in the project.
  - `pages`: Contains pages used in the project.
  - `shared`: Contains shared components, hooks, helpers used in the project.
  - `stores`: Contains nano stores used in the project.
  - `styles`: Contains `scss` styles used in the project.

## Tech Stack

**Language:** TypeScript
**Client Framework:** Astro
**Server Framework:** Vercel Functions
**Styles:** SCSS, SCSS Modules
**Content:** MDX
**APIs:** Cloudinary, GitHub, Wakatime, Vercel, Spotify
**Database:** Xata.io

## Run Locally

- Clone the project

```bash
$  git clone git@github.com:sergiobarria/sergiobarria.com-astro.git
$  cd sergiobarria.com-astro
$  pnpm install
```

- Create `.env` file similar to `.env.example` and fill the variables.

- Run the project

```bash
$  pnpm dev --> if not using serverless functions
$  pnpm sertve --> if using serverless functions
```

## Contributing

Contributions are always welcome!

## Screenshots

My pinned github repos using Github GraphQL API and Urql client for data fetching

<img alt="featured projects from github" src="https://res.cloudinary.com/sbarria-dev/image/upload/v1669242857/sergiobarria/repo/CleanShot_2022-11-23_at_17.33.24_lepfoj.png" />

Currently playing using spotify API

<img alt="currently playing card" src="https://res.cloudinary.com/sbarria-dev/image/upload/v1669242893/sergiobarria/repo/CleanShot_2022-11-23_at_17.34.36_tzvh16.png" />



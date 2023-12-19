# Spunk

An ambitious next generation JavaScript framework similar to Next.JS with options to not send any JS to the client and without the bulk of React. Instead, it uses [Preact](https://preactjs.com/) and its React compatiblity layer `preact/compat`.

## Status

This project is actively in development. See the [Features Section](#features) below for a breakdown of what is usable and planned. This should **not** be used in production, yet. If you'd like to see my more raw thoughts and more immediate plan see my [TODO](TODO.md)

## Build Instructions

1. Install Node.js v14.19 / v16.9 or greater
2. Enable Corepack
   `npx corepack enable`
3. Install Dependencies
   `npx yarn`
4. Open `packages/framework` folder
   `cd packages/framework`
5. Build
   `npx yarn build`

## Usage

1. Build Instructions
2. Open `examples`
   `cd examples`
3. Copy `examples/all` to `examples/your-name-here`
   `cp -r all your-name-here`
4. Open your new package
   `cd your-name-here`
5. Install Dependencies
   `npx yarn`
6. Build
   `npx yarn build`
7. Serve the `build` folder and enjoy! I like using python for this but anything can work.
   `python -m http.server -d build`

## Why?

Most of the JavaScript frameworks out there are not very performant when there is more than a few pages. And out of the frameworks that are somewhat performant, they either require extra configuration, especially for pre-rendering, or require developers to learn a completely new style of writing JavaScript (again?) and with no standard ecosystem of components from React.

## Goals

- Static site generation as much as possible
- "Nice" developer experience
- Performance at build time and run time
- Have an easily attainable Chrome Lighthouse 100% performance score for all use cases
- Server side rendering in any environment (Edge, Serverless, and Self-hosted)
- Keep source code small, simple, and easy to understand
- React component compatiblity

## Features

- [ ] Rendering Strategies
  - [x] Static
    - Pre-renders the page at build time and serves to the client **without** any JavaScript
  - [x] Client Only
    - Pre-renders the page at build time and serves to the client **with** its JavaScript bundle and hydrates into the pre-rendered page
  - [x] Server Only
    - Renders the page on a server and serves it to the client **without** any JavaScript
  - [ ] Client and Server
    - Renders the page on a server and serves it to the client **with** its JavaScript bundle and hydrates into the page
- [x] Typescript
- [ ] Routing
  - [x] File based routing in the ./src/routes directory relative to project's package.json
  - [x] Type safe [`Link`s](packages/framework-router/src/components/Link.tsx) to local routes. See [example](examples/links) for more details
  - [ ] [Hybrid Routing](docs/HYBRID_ROUTING.md) where the client and server optimize the loading of routes in the background
- [ ] Built-in development server
- [ ] Server Environments
  - [ ] Edge
    - [ ] Cloudflare Pages/Workers
    - [ ] Netlify
    - [ ] Vercel
  - [ ] Serverless
  - [ ] Self-hosted

## FAQ

#### Why doesn't this project have an open source license?

Starting an open source project alone with my main focus being developing a good framework, it doesn't make much sense to me to just let anyone (mainly big companies) to use this for free. I believe I'm working on something very valuable to many people and companies and don't want to end up with millions of users and not be earning a livable income from that.

I don't have a marketing department or legal team, so please do me a favor, spread the word and don't use this software in an unauthorized way. And don't forget to contribute if you have some input.

For individuals, education, or even small companies just starting out (<5 employees), I don't really care and I encourage all of you to use this.

For anyone (anything?) else, let's setup a custom license for your use of this software. No, I won't sell this IP.

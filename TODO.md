# <u>TODO</u>

- [ ] Rendering Strategies
  - [x] Static
  - [x] Client Only
    - [x] init impl
    - [x] find something that works better. basic hooks don't work with react-dom
    - [ ] Generate better HTML
    - [ ] Allow users to add elements to \<head> tag
  - [ ] Server Only
    - [ ] Self-hosted
      - [x] Build
      - [x] Built-in Server
      - [ ] Add back `preact` and `preact-render-to-string` for server-side hydration (from pre-rendered html)
  - [ ] Server and Client
- [ ] HTML Layouts
- [ ] Plugins?
- [ ] Vanilla Extract
- [x] Test the order of HTML, CSS, and JS getting downloaded and painted on the screen
- [x] Defer CSS loading for elements not in view
- [ ] Compare Speed of MJS loading and CJS loading in browser
- [ ] Use web workers to pre-render pages client side
  - [ ] Preact example: https://github.com/developit/preact-worker-demo/tree/master
- [x] Use Preact instead of React it's soooo much better
- [ ] Compile user scripts to ESM to allow tree shaking
- [x] Clean up Framework & Example dependencies (after done testing rendering methods)
- [ ] TS config for example
- [ ] TS config for framework
- [ ] Better way for JS entrypoint templates
- [ ] Experiment with the option to pre-render
  - [ ] Client Only
  - [ ] Server Only
  - [ ] Server and Client
- [ ] Use [Java Research license](https://github.com/deroproject/derohe/blob/main/license.txt) for LICENSE.md
  - [ ] Add licenses folder for dependencies
- [ ] Router
  - [ ] Use a tags w/ onclick e.preventDefault() (links work but won't be optimized until JS loads)
  - [x] Generate types based on routes directory structure
  - [ ] Implement service worker for client side pre rendering
    - [ ] Fallback to normal worker if service work unavailable
- [ ] Use [nginx](https://github.com/jirutka/nginx-binaries?tab=readme-ov-file#usage-example) as self-hosted server instead
- [ ] DB integration
  - [ ] FoundationDB

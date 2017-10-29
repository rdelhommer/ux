# aurelia-ux

[![npm Version](https://img.shields.io/npm/v/aurelia-ux.svg)](https://www.npmjs.com/package/aurelia-ux)
[![ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://zenhub.io)
[![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This library is part of the [Aurelia](http://www.aurelia.io/) platform and extends it by adding a higher level set of user experience-oriented features such as scoped styles, theming, components and UX patterns.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.aurelia.io/) and [our email list](http://eepurl.com/ces50j). We also invite you to [follow us on twitter](https://twitter.com/aureliaeffect). If you have questions look around our [Discourse forums](https://discourse.aurelia.io/), chat in our [community on Gitter](https://gitter.im/aurelia/discuss) or use [stack overflow](http://stackoverflow.com/search?q=aurelia). Documentation can be found [in our developer hub](http://aurelia.io/docs). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome or Firefox Extension and visit any of our repository's boards.

## Documentation

Check out the [showcase application](https://github.com/aurelia/app-ux-showcase) for demos and documentation. If you are interested in contributing, have a read through [our wiki](https://github.com/aurelia/ux/wiki).

## Building

**Before The First Build**

`npm install` installs dependencies for the base Aurelia UX project
`npm run build` at the base project to build Aurelia UX

`lerna bootstrap`: sets up a symlink between all of the packages in the monorepo
`lerna run build`: builds all of the mono repo projects.

>Note: `lerna run build` is very CPU intensive and takes a small period of time on most machines. If you are working within a single component, you might try `npm run build` instead at the component level.

## Tests

```shell
npm run test
```

## Developing

```shell
npm run develop
```

# LWC TodoMVC

This [TodoMVC app](http://todomvc.com/) works as a proof of concept and boilerplate for standalone applications based on Lightning Web Components (LWC).

## Requirements

 * Node 8.12.x
 * NPM 6.4.x
 * Yarn >= 1.10.x

## Supported Browsers

The Lightning Web Components model supports the browsers that Salesforce supports.

These browsers take full advantage of Lightning Web Components performance enhancements.

| Browser Name | Version |
 --- | --- |
| Google Chrome™ | 59 |
| Microsoft® Edge | 15 |
| Mozilla® Firefox® | 54 |
| Apple® Safari® | 11 |

For earlier versions of these browsers, and for other browsers, the framework uses compatibility mode. Compatibility mode uses the lowest common denominator—the framework transpiles down to ES5 and adds the required polyfills. Not all modern Web APIs are available by default.

Running in compatibility mode affects performance. For example, Lightning Web Components work correctly in Safari 9 and Microsoft® Internet Explorer® 11, but they miss framework optimizations, don’t perform as well, and not all modern Web APIs are available.

Please note that this sample repo may include some cutting-edge examples that won't work in IE 11 because they use APIs that aren't supported by IE 11.

## Installation

### 1) Download the repository

In order to clone the repo, you need to make sure that you can [connect to Github with SSH](https://help.github.com/enterprise/2.8/user/articles/connecting-to-github-with-ssh/).

```bash
git clone git@github.com/salesforce/lwc-todomvc.git
cd lwc-todomvc
```

### 2) Install dependencies

```bash
yarn install
```

### 3) Build the project

```bash
yarn build
```

By default the command will generate the application in **development** and **non-compat** mode. You can change the default behavior with the `NODE_ENV` and `COMPAT` environment variable.

```bash
COMPAT=true NODE_ENV=production yarn build
```

> **Note:** The server will then take care of sending the right file based on the user agent.

### 4) Build & run in dev mode

For your development convenience, you can build the file bundles into /dist and launch a Node server + browser by running:

```bash
yarn start
```

### 5) Running in different modes
You can run the application in different Shadow DOM modes, you can read `main.js` for mode details.
To toggle the different configurations use the following queryString parameters:

```bash
http://localhost:3000/?useNativeShadow=true&useCustomElementRegistry=true
```

### 6) Run test

```bash
yarn test:unit          # Run jest unit tests
yarn test:integration   # Run webdriver integraiton test
```

Running the webdriver test requires a [selenium](http://www.seleniumhq.org/) server running locally over the port `4444`.

If you don't want to run the webdriver test locally, you will need to run it on [Sauce Labs](https://saucelabs.com). You will need to set the following environment variable to run test over Sauce Labs: `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`.

```bash
SAUCE_USERNAME=[my-username] SAUCE_ACCESS_KEY=[my-access-token] yarn run test:integration
```

## Configurations

Configuring your editor to use our lint and code style rules will help make the
code review process delightful!

### types

LWC relies on type annotations heavily.

* Make sure your editor supports [typescript](https://www.typescriptlang.org/).
* Additionally, you can use [flow](https://flowtype.org/).

### eslint

[Configure your editor][eslint-integrations] to use our eslint configurations.

### editorconfig

[Configure your editor][editorconfig-plugins] to use our editor configurations.

If you are using Visual Studio Code then use this:

```
ext install EditorConfig
```

### Lint

```bash
yarn lint
```

The recommended way to lint this project is to [configure your
editor][eslint-integrations] to warn you in real-time as you edit the file.

[eslint-integrations]: http://eslint.org/docs/user-guide/integrations
[editorconfig-plugins]: http://editorconfig.org/#download

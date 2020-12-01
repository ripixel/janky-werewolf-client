# Janky Werewolf Client

A broser-based version of the Ultimate Werewolf 🐺 card game. This is the client code only!

The backend lives in its own repo, created by the magic McGoddard: [mcgoddard/janky_werewolf_backend](https://github.com/mcgoddard/janky_werewolf_backend)

|                      |                                                                                                          Status                                                                                                           | Link                                                                              |
| -------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------- |
|   Circle CI `master` |        [![CircleCI](https://circleci.com/gh/ripixel/janky-werewolf-client.svg?style=svg&circle-token=c9e20d61c33eb4d1cc9bb6d77dd22128f0a27b1d)](https://circleci.com/gh/ripixel/janky-werewolf-client/tree/master)        | https://www.jankywerewolf.co.uk/                                                  |
|  Circle CI `staging` | [![CircleCI](https://circleci.com/gh/ripixel/janky-werewolf-client/tree/staging.svg?style=svg&circle-token=c9e20d61c33eb4d1cc9bb6d77dd22128f0a27b1d)](https://circleci.com/gh/ripixel/janky-werewolf-client/tree/staging) | https://staging.jankywerewolf.co.uk/                                              |
| Snyk Vulnerabilities |        [![Known Vulnerabilities](https://snyk.io/test/github/ripixel/janky-werewolf-client/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ripixel/janky-werewolf-client?targetFile=package.json)         | https://app.snyk.io/org/ripixelcodes/project/c0909e52-0df4-4868-8b70-b4dc768da8a1 |

## What does it use?

This project leverages:

- TypeScript
- Node
- Webpack
- ESLint
- Prettier
- Jest
- Sentry
- NPM Audit
- React

...amongst some other bits which aren't headline-worthy.

## Contributing to this repo

### Documentation

See the [docs](docs) folder for various pieces of documentation on how to add to this repository.

Some useful links:

- [Adding a New Role](docs/adding_a_new_role.md)

### Adding Code

See [Local Development](#local-development) for how to contribute code to this repository.

## How is it built?

It uses the [CircleCI Config](../.circleci/config.yml) to checkout, build, lint, test, and deploy in 5 separate jobs (only deploying on `master` or `staging` branches).

It will moan if any of the interim (build, lint, test) stages fail, and provide integrated feedback for lint and test in CircleCI's UI.

## Deploying

As described above, deployment is handled by CircleCI. Pushing an update to either the `master` or `staging` branches will deploy to the respective URL:

- Master/Production: https://www.jankywerewolf.co.uk
- Staging: https://staging.jankywerewolf.co.uk

To be sure your version is deployed, the build job number is displayed in the bottom-left on all screens.

_Note:_ Pushing to the `master` branch can only be done via merged pull request. Anything can be pushed to `staging`.

## What are the standards?

### Linting

Linting uses prettier + ESLint (TSLint was deprecated and is now integrated into ES). Husky runs on pre-commit to ensure everything follows these standards, but they're also checked on CI build too just to make sure!

### Tests

Testing uses Jest, with a requirement that **all files are covered at least 30%** - this is to ensure we do not end up with untested code in our codebase!

Uses React Testing Library for component rendering and interaction in tests.

### Builds

We use webpack to get all the "niceness" it provides, like creating a single comparable file and removing unnecessary code. Any TypeScript failures will cause the build to fail, as will any normal JS build errors.

Use `.env.{NODE_ENV}` files to control what your environment variables are - these will get replaced via webpack with the correct value. If no `.env.{NODE_ENV}` can be found your specific environment, `.env` will be used as a fallback. System Environment variables (such as those set on the command line) take precedence over _any_ `.env` files.

### Auditing

Currently uses NPM Audit with a level of `high` or `critical` causing a build failure on the pipeline, as well as a failure in the pre-push hook.

## Local Development

### Installing Dependencies

To run this locally, first install the dependencies:

```bash
npm ci
```

### Tests

To run tests with development output, use:

```bash
npm run test
```

If you also want to watch use:

```bash
# Watch only staged files
npm run test -- --watch

# Watch all files
npm run test -- --watchAll
```

_Note:_ Using `test` will **not** give the error about uncovered files. If you want to make sure it doesn't fail on the CI, use `test:ci` with the above commands.

### Audit

To run the audit at the correct level (ie prod only and fail on high vuln) use:

```bash
npm run audit
```

### Build

#### Development Build Mode

```bash
npm run dev
```

This will watch any build-dependant files, and rebuild/restart the server on change (you will need to refresh your browser, of course).

#### Staging

To create staging-level output, do:

```bash
npm run build:staging
```

#### Production

To create production-level output, do:

```bash
npm run build
```

### CI

To do everything the CI does (assuming prod), do:

```bash
npm run lint:ci && npm run test:ci && npm run audit:ci && npm run build
```

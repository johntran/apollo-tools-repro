# apollo-tools-repro

Repro for this issue: https://github.com/apollographql/apollo-tooling/issues/1541

## Setting up Repro

1. Clone repo

```console
git clone https://github.com/johntran/apollo-tools-repro.git
cd apollo-tools-repro
```

2. Install Rush

```console
npm install -g @microsoft/rush
```

3. Install dependencies

```console
rush update
```

Reproduction step

Have two consoles open. Starting from the root.

Console One - this boots up the GraphQL server

```console
cd apps/starwars-server && rushx start
```

Console Two - this causes the error

```console
rush apollo
```

Get

```console
FAILURE (1)
================================
frontend (2.26 seconds)
Error: Cannot find any-observable implementation nor global.Observable. You must install polyfill or call require("any-observable/register") with your preferred implementation, e.g. require("any-observable/register")('rxjs') on application load prior to any require("any-observable").
    at loadImplementation (~/apollo-tools-repro/common/temp/node_modules/.registry.npmjs.org/any-observable/0.3.0/node_modules/any-observable/register.js:29:9)
    at ~/apollo-tools-repro/common/temp/node_modules/.registry.npmjs.org/any-observable/0.3.0/node_modules/any-observable/loader.js:30:18
    at Object.<anonymous> (~/apollo-tools-repro/common/temp/node_modules/.registry.npmjs.org/any-observable/0.3.0/node_modules/any-observable/index.js:2:39)
================================
```

## Context

This monorepo is managed with [RushJS](https://rushjs.io/).

`rush apollo`

- is a global Rush command.
- can be located in `common/config/rush/command-line.json` lines 125-141
- calls `download-schema` npm script in the `generate-graphql-typescript` repo, which downloads the GQL schema that `frontend` bases `codegen` on.
- then it calls `rush apollo-types`, another global Rush command

`rush apollo-types`

- is a bulk Rush command. so it calls this command on every repo.

`apollo-types`

- is an npm script command. `apps/frontend/package.json` line 9
- this deletes all folders named `generatedTypes` then it calls `codegen`

## Thoughts

pnpm could be the cause. If you swap out yarn for pnpm by:

- going to `rush.json` and commenting line 29 and uncommenting line 32
- going to `common/config/rush` and deleting `pnpm-lock.yaml` and `pnpmfile.js`
- `rush update --full --purge` anywhere in the repo
- `rush apollo` anywhere in the repo

You'll get a success message

```console
SUCCESS (3)
================================
@johntran/generate-graphql-typescript
frontend (2.67 seconds)
starwars-server
================================
```

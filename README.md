# Itau Angular Exam

## Introduction

This is a exam challenge for front end developer for Itaú company, the biggest bank in Brazil, using Angular framework and most of its features.

Requirements for Pleno position:

* Full Angular project
* Layout following exact 100% the prototype
* Route system
* Use CSS Grid
* Sass
* Input masks
* Angular Material Components
* Required all field with Rx Forms
* Interceptors
* Advanced language usage
* Project architecture looking for scalability
* Error handler with Toaster
* Usage of custom types (models)
* Multi language with EN/PT using i18n
* External plugins usage in intelligent way, looking for performance
* Commented code (many comments look like bad code)
* Build <app-cep> component + Event Emitter to feed other fields
* Pipes for formats


## Prototype

The project follow exact this [Prototype](https://projects.invisionapp.com/share/P510TQNYQ3TJ#/screens/450456419)

## Commands

### Start

`npm start`

### Server

You can use the mocked server with `json-server`

use the script, by default listen on port 3210

`npm run server`

After some updates, you can reset the mock with

`npm run mock`

### Config

The environment files have custom configs to stup the app at runtime with dependence injection

** options**

`environment.interface.ts`

* Interface *

```
export interface Environment {
  production: boolean
  name: string
  port: number
  api: string
  useInMemoryData?: boolean
  inMemoryDataDelay?: number,
  logger: boolean
}

```

# Internacionalization

The app have custom locales to change the language.

Default is `pt`, with `en` option

Files are located at `assets/i18`

### Storybook

In development to expose the components, needed setup

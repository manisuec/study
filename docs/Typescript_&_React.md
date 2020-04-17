# Typescript & React

### New project

`npx create-react-app hello-tsx --typescript`

### Existing project

First run 

`npm install --save typescript @types/node @types/react @types/react-dom @types/jest`

Rename the files to .ts or .tsx and then start the server. This will generate the tsconfig.json file automatically and you are ready to write React in TypeScript.

### Good first tutorial

[TypeScript Tutorial for JS Programmers Who Know How to Build a Todo App] (https://ts.chibicode.com/todo/)

### ESlint

```
npm i -D eslint eslint-config-typescript
eslint --init

? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? React
? Does your project use TypeScript? Yes
? Where does your code run? Browser, Node
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Standard: https://github.com/standard/standard
? What format do you want your config file to be in? JSON
Checking peerDependencies of eslint-config-standard@latest
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest eslint-config-standard@latest eslint@>=6.2.2 eslint-plugin-import@>=2.18.0 eslint-plugin-node@>=9.1.0 eslint-plugin-promise@>=4.2.1 eslint-plugin-standard@>=4.0.0 @typescript-eslint/parser@latest
? Would you like to install them now with npm? Yes
Installing eslint-plugin-react@latest, @typescript-eslint/eslint-plugin@latest, eslint-config-standard@latest, eslint@>=6.2.2, eslint-plugin-import@>=2.18.0, eslint-plugin-node@>=9.1.0, eslint-plugin-promise@>=4.2.1, eslint-plugin-standard@>=4.0.0, @typescript-eslint/parser@latest
+ eslint@6.8.0
+ eslint-plugin-react@7.19.0
+ eslint-plugin-promise@4.2.1
+ eslint-plugin-standard@4.0.1
+ @typescript-eslint/parser@2.28.0
+ @typescript-eslint/eslint-plugin@2.28.0
+ eslint-config-standard@14.1.1
+ eslint-plugin-import@2.20.2
+ eslint-plugin-node@11.1.0
added 16 packages from 11 contributors, updated 5 packages and audited 932573 packages in 22.874s

49 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Config

tsconfig.json file

```
{
  "compilerOptions": {
    "target": "esnext",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```

To allow syntax like

```
import React from "react";
import ReactDOM from "react-dom";
```

Set `"allowSyntheticDefaultImports": true` in tsconfig.

All [tsconfig options](https://www.typescriptlang.org/v2/en/tsconfig)

### React Hooks in TypeScript

Read [React Hooks in TypeScript](https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d)

### Types or Interfaces?

Interfaces are different from types in TypeScript, but they can be used for very similar things as far as common React uses cases are concerned. Here's a helpful rule of thumb:

Always use interface for public API's definition when authoring a library or 3rd party ambient type definitions.

Consider using type for your React Component Props and State, because it is more constrained.

Types are useful for union types (e.g. type MyType = TypeA | TypeB) whereas Interfaces are better for declaring dictionary shapes and then implementing or extending them.

### Enum Types
Enums in TypeScript default to numbers. You will usually want to use them as strings instead:

```
export enum ButtonSizes {
  default = "default",
  small = "small",
  large = "large",
}
```

Usage:

```
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSizes.default} {...props} />;

```
A simpler alternative to enum is just declaring a bunch of strings with union:

`export declare type Position = "left" | "right" | "top" | "bottom";`

This is handy because TypeScript will throw errors when you mistype a string for your props.

### ProgressBar

ProgressBar using recharts.js 

# expression-globals-typescript

This library mocks the After Effects expressions API in TypeScript, providing types and the available global functions and variables.

> To be used with [rollup-plugin-ae-jsx](https://www.npmjs.com/package/rollup-plugin-ae-jsx), which will convert the code to After Effects friendly `.jsx` files and remove the globals imported from this package.

## Usage

1. Install

   ```sh
   npm install expression-globals-typescript --save-dev
   ```

   Found in our [Expressions Library Template](https://github.com/motiondeveloper/expressions-library-template).

2. Import classes to create layer, comp, and property mocks

   ```ts
   import { Property, Layer, Comp } from "expression-globals-typescript";

   const thisProperty = new Property<string>("Property value");
   const thisLayer = new Layer();
   const thisComp = new Comp();
   ```

   You can then use the properties and methods of these objects as you would within expressions.

   The `Property` constructor function takes a value and type (`<>`) for the `value` of the `Property`.

3. Import types

   This package makes available After Effects specific types, such as `Color`, `Vector` and more. See `src/index.ts` for the available types.

   ```js
   import { Color, Vector, Value } from "expression-globals-typescript";
   ```

## Why?

When writing expressions in **Typescript** using our [Expressions Library Template](https://github.com/motiondeveloper/expressions-library-template) and [rollup-plugin-ae-jsx](https://www.npmjs.com/package/rollup-plugin-ae-jsx), TypeScript will complain if you try to use the global functions and objects available in expressions.

This is because they aren't defined in the development environment.

`expression-globals-typescript` solves this by mocking the entire expressions API in TypeScript, so you can import and use these globals, with the advantages of them being fully typed.

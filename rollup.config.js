import node from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import * as meta from "./package.json";

const name = 'crossfilter'

const config = {
  input: `index.js`,
  output: {
    file: `${name}.js`,
    name: name,
    format: "umd",
    indent: true,
    extend: true,
    banner: `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`
  },
  plugins: [
    node(),
    json(),
    commonjs()
  ]
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      file: `${name}.min.js`
    },
    plugins: [
      ...config.plugins,
      terser({
        output: {
          preamble: config.output.banner
        }
      })
    ]
  }
];

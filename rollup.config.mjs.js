import babel from "rollup-plugin-babel";
import progress from "rollup-plugin-progress";
import sizes from "rollup-plugin-sizes";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import analyze from "rollup-plugin-analyzer";

const limitBytes = 1e6;

const onAnalysis = ({ bundleSize }) => {
  if (bundleSize < limitBytes) return;
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`);
  return process.exit(1);
};

module.exports = {
  input: "build/es6/ctrltab.js",
  output: {
    name: "CtrlTab",
    file: "build/ctrltab.js",
    format: "es"
  },
  external: [
    "@dwtechs/checkhard",
  ],
  plugins: [
    babel({
      // exclude: "node_modules/**" // only transpile our source code
    }),
    progress({
      clearLine: true// default: true
    }),
    sizes(),
    sizeSnapshot(),
    analyze({ onAnalysis, skipFormatted: false })
  ]
};

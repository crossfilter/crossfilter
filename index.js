// Note(cg): exporting current version for umd build.
import crossfilter from './src/index.js';
import { version } from './package.json';
crossfilter.version = version;

export default crossfilter;

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import sizes from 'rollup-plugin-filesize';

const extensions = [
  '.js', '.jsx'
];
const dependencies = Object.keys({...(pkg.peerDependencies || {}), ...(pkg.dependencies || {})});
function containsId(id){
  for(let i = 0; i < dependencies.length; i++){
    if(id.includes('node_modules/' + dependencies[i])){
      return true;
    }
  }
  return false;
}
export default {
  input: './src/index.js',
  external: containsId,
  plugins: [
    // Allows node_modules resolution
    resolve({ module: true, main: false, extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
    sizes()
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }]
};
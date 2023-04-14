import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import litcss from 'rollup-plugin-lit-css';

export default {
  input: 'src/game-app.js', 
  output: {
    file: 'dist/my-element.js',
    format: 'esm', 
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    litcss({
      include: '**/*.css',
    }),
  ],
};
import { Configuration } from "webpack";
import { merge } from 'webpack-merge';
import commonConfiguration from './webpack.config';

const config: Configuration = merge<Configuration>(commonConfiguration, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.prod.json',
        },
      },
    ],
  },
});

export default config;
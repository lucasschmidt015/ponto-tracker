/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
require('dotenv').config();

import devConfig from './dev';
import prodConfig from './prod';

let configs = {};

const production =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';

const development = !production;

if (development) {
  configs = {
    ...devConfig,
  };
}

if (production) {
  configs = {
    ...prodConfig,
  };
}

export default configs;

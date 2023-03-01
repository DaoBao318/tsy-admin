import { getEnv } from '/@/utils/env';
export const ID_PROD_ENV = getEnv() === 'production';

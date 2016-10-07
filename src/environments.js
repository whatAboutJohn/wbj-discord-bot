import env from 'dotenv';

export default Object.assign({
  environment: 'development'
}, env.config());

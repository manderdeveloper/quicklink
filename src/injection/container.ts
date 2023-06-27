import { container } from './containerBase';

const environment = process.env.NODE_ENV;

if (environment === 'test') {
  require('./containerTest');
} else {
  require('./containerDevelopment');
}

export default container;
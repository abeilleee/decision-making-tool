import './styles.scss';
require.context('./assets/images', true);
require.context('./assets/audio', true);

import { App } from './app/app';

const app = new App();

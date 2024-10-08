import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.module.scss';

import store from './redux/store';
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

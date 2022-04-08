import { render } from 'react-dom';
import './translations/i18n';
import App from './App';

const rootElement = document.getElementById('root');
render(<App />, rootElement);

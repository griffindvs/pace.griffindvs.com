import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

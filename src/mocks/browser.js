import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Setup worker
export const worker = setupWorker(...handlers);

import { Timer } from './timerService';
import { WARNING_THRESHOLD_MS } from '../constants/performanceConstants';


export const timedFetch = async (url, options = {}) => {
  const timer = new Timer();
  timer.start();

  try {
    const response = await fetch(url, options);
    timer.stop();

    const elapsed = timer.getElapsed();

    if (elapsed > WARNING_THRESHOLD_MS) {
      console.warn(`⚠️ Slow request: ${url} took ${elapsed} ms`);
    } else {
      console.log(`✅ Request: ${url} completed in ${elapsed} ms`);
    }

    return { response, elapsed };
  } catch (error) {
    timer.stop();

    const elapsed = timer.getElapsed();

    if (elapsed > WARNING_THRESHOLD_MS) {
      console.warn(`⚠️ Slow failed request: ${url} took ${elapsed} ms`);
    }

    error.elapsed = elapsed;
    throw error;
  }
};

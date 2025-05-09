import { Timer } from './timerService';

export const timedFetch = async (url, options = {}) => {
  const timer = new Timer();
  timer.start();

  try {
    const response = await fetch(url, options);
    timer.stop();

    const elapsed = timer.getElapsed();
    return { response, elapsed };
  } catch (error) {
    timer.stop();

    const elapsed = timer.getElapsed();
    // Rethrow the error but attach elapsed time for logging
    error.elapsed = elapsed;
    throw error;
  }
};

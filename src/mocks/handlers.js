import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.post('/submissions', async ({ request }) => {
    const { username } = await request.json();

    // Simulate network latency: wait 500–1500 ms randomly
    const randomDelay = Math.floor(Math.random() * 1000) + 500;
    await delay(randomDelay);

    // Simulate random failures: 25% chance
    const shouldFail = Math.random() < 0.25;
    if (shouldFail) {
      return HttpResponse.json(
        { error: 'Random server error: please try again' },
        { status: 500 }
      );
    }

    return HttpResponse.json(
      { message: `Submission saved successfully (after ${randomDelay}ms delay)` },
      { status: 200 }
    );
  }),
];

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/submissions', async ({ request }) => {
    const { username } = await request.json();

    if (username === 'fail') {
      return HttpResponse.json(
        { error: 'Server error: failed to save submission' },
        { status: 500 }
      );
    }

    return HttpResponse.json(
      { message: 'Submission saved successfully' },
      { status: 200 }
    );
  }),
];

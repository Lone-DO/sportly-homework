import type { EventHandlerRequest, H3Event } from 'h3';

import type { AllLeague } from '~/lib/types';

function throwError(event: H3Event<EventHandlerRequest>) {
  return sendError(event, createError({
    statusCode: 504,
    statusMessage: 'Unable to reach thesportsdb API.',
  }));
}

export default defineEventHandler(defineCachedEventHandler(async (event) => {
  try {
    const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php', {
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'sporty-homework-losovoj | citizin@outlook.com',
      },
    });

    if (!response.ok) {
      return throwError(event);
    }

    const results = await response.json() as AllLeague;
    return results.leagues || [];
  }
  catch {
    return throwError(event);
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'all-league',
}),
);

import type { EventHandlerRequest, H3Event } from 'h3';

import type { LookupLeague } from '~/lib/types';

function throwError(event: H3Event<EventHandlerRequest>) {
  return sendError(event, createError({
    statusCode: 504,
    statusMessage: 'Unable to reach thesportsdb API.',
    data: {
      event,
    },
  }));
}

export default defineEventHandler(defineCachedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string;
  const apiKey = '123';
  try {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/lookupleague.php?id=${id}`, {
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'sporty-homework-losovoj | citizin@outlook.com',
      },
    });

    if (!response.ok) {
      return throwError(event);
    }

    const results = await response.json() as LookupLeague;
    if (!results?.leagues?.length) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'League does not exist',
      }));
    }

    if (results.leagues.length === 1) {
      return results.leagues[0];
    }

    const bestMatch = results.leagues.find(({ idLeague }) => idLeague === id) || results.leagues[0];
    return bestMatch;
  }
  catch {
    return throwError(event);
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'lookup-league',
  getKey: async (event) => {
    const query = await getQuery(event);
    return query.id?.toString() || '';
  },
}),
);

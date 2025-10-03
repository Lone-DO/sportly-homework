import type { EventHandlerRequest, H3Event } from 'h3';

import type { LookupLeagueSeasons } from '~/lib/types';

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
  try {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${id}`, {
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'sporty-homework-losovoj | citizin@outlook.com',
      },
    });
    if (!response.ok) {
      return throwError(event);
    }

    const results = await response.json() as LookupLeagueSeasons;
    if (!results?.seasons?.length) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'League does not exist, or has no Badges',
      }));
    }
    /** Return Latest Badge, appears to be sorted by Date (descending) */
    return results.seasons[results.seasons.length - 1];
  }
  catch {
    return throwError(event);
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'lookup-league-badge',
  getKey: async (event) => {
    const query = await getQuery(event);
    return query.id?.toString() || '';
  },
}),
);

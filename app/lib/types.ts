import type { RouteLocationRaw } from 'vue-router';

export type NullString = string | null;

export type AllLeagueFilters = {
  sport: NullString;
  leagueName: NullString;
};

export type AllLeague = {
  leagues: AllLeagueItem[] | null;
};
export type AllLeagueItem = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
};

export type LookupLeague = {
  leagues: LookupLeagueItem[] | null;
};

export type LookupLeagueItem = {
  idLeague: NullString;
  idSoccerXML: NullString;
  idAPIfootball: NullString;
  strSport: NullString;
  strLeague: NullString;
  strLeagueAlternate: NullString;
  intDivision: NullString;
  idCup: NullString;
  strCurrentSeason: NullString;
  intFormedYear: NullString;
  dateFirstEvent: NullString;
  strGender: NullString;
  strCountry: NullString;
  strWebsite: NullString;
  strFacebook: NullString;
  strInstagram: NullString;
  strTwitter: NullString;
  strYoutube: NullString;
  strRSS: NullString;
  strDescriptionEN: NullString;
  strDescriptionFR: NullString;
  strDescriptionIT: NullString;
  strDescriptionCN: NullString;
  strDescriptionJP: NullString;
  strDescriptionRU: NullString;
  strDescriptionES: NullString;
  strDescriptionPT: NullString;
  strDescriptionSE: NullString;
  strDescriptionNL: NullString;
  strDescriptionHU: NullString;
  strDescriptionNO: NullString;
  strDescriptionPL: NullString;
  strDescriptionIL: NullString;
  strTvRights: NullString;
  strFanart1: NullString;
  strFanart2: NullString;
  strFanart3: NullString;
  strFanart4: NullString;
  strBanner: NullString;
  strBadge: NullString;
  strLogo: NullString;
  strPoster: NullString;
  strTrophy: NullString;
  strNaming: NullString;
  strComplete: NullString;
  strLocked: NullString;
};

export type LookupLeagueBadge = {
  strSeason: NullString;
  strBadge: NullString;
};

export type LookupLeagueSeasons = {
  seasons: LookupLeagueBadge[] | null;
};

export type DropdownItem = {
  icon: string;
  label: string;
  value: NullString;
  to?: RouteLocationRaw;
  classes?: string;
  size?: string;
  onClick?: () => any;
};

export type Icons = {
  'chevron-up': string;
  'chevron-down': string;
  'basketball': string;
  'soccer': string;
  'motorsport': string;
  'ice-hockey': string;
  'american-football': string;
};

export const getLeagueIdAndDateRedisKey = (
  d: string,
  leagueId: string
) => {
  return `LeagueIdAndDateRedisKey_${d + leagueId}`;
};

export const getFixtureIdRedisKey = (
  fixtureId: string
) => {
  return `FixtureIdRedisKey_${fixtureId}`;
};

export const getStandingsRedisKey = (
  leagueId: string,
  season: string
) => {
  return `StandingsRedisKey_${leagueId}_${season}`;
};

export const getPredictionsRedisKey = (
  fixtureId: string  
) => {
  return `PredictionsRedisKey_${fixtureId}`;
};

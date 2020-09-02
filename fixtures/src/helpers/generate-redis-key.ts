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

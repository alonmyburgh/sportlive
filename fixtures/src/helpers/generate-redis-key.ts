export const getLeagueIdAndDateRedisKey = (
  d: string,
  leagueId: string
) => {
  return `LeagueIdAndDateRedisKey_${d + leagueId}`;
};

export const getLeagueIdAndDateRedisKey = (
  d: moment.Moment,
  leagueId: string
) => {
  return `LeagueIdAndDateRedisKey_${d.format("YYYY-MM-DD") + leagueId}`;
};

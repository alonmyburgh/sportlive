import moment from "moment";

export const getIsToday = (d: string): boolean => {
  const now = moment(new Date()).utc().format('YYYY-MM-DD');

  if (now === d) {
    return true;
  }

  return false;
};

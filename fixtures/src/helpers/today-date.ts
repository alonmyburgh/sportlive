import moment from "moment";

export const getIsToday = (d: moment.Moment): boolean => {
  const now = moment(new Date()).utc().set({ hour: 0, minute: 0, second: 0 });

  if (d.diff(now, "hours") > 22 || d.diff(now, "hours") < 0) {
    return false;
  }

  return true;
};

import moment from "moment";
import round from "lodash/round";

export const TimeToDate = (timeStamp, format = "DD/MM/YYYY ") => {
  return moment(timeStamp).format(format);
};

const today = () => moment(new Date().getTime()).format("DD/MM/YYYY");
const truncTimeStamp = timeStamp => moment(timeStamp).format("DD/MM/YYYY");

export const distanceFromToday = timeStamp => {
  const date1 = truncTimeStamp(timeStamp);
  const date2 = today();
  const diff = moment(date1, "DD/MM/YYYY") - moment(date2, "DD/MM/YYYY");
  const duration = moment.duration(diff, "milliseconds");
  const days = duration.asDays();
  return days;
};

const getDescriptorOfTimeFrame = diff => {
  if (diff > 30) {
    return "months";
  }
  return "days";
};

const getQuantityOfTimeFrame = diff => {
  const desc = getDescriptorOfTimeFrame(diff);
  const duration = moment.duration(diff, "days");

  if (desc === "months") return round(duration.asMonths(), 2);
  else return duration.asDays();
};

export const distanceFromTodayText = timeStamp => {
  const diff = distanceFromToday(timeStamp);
  if (diff < -1) {
    return `${getQuantityOfTimeFrame(
      Math.abs(diff)
    )} ${getDescriptorOfTimeFrame(diff)} ago`;
  } else if (diff == -1) {
    return `yesterday`;
  } else if (diff === 0) {
    return "today";
  } else if (diff === 1) {
    return "tommorow";
  } else {
    return `in ${getQuantityOfTimeFrame(diff)} ${getDescriptorOfTimeFrame(
      diff
    )}`;
  }
};

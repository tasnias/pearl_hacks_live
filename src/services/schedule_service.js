import fetchData from "./sheets_to_json";
import moment from "moment-timezone";

export default class FaqService {
  // TODO: fix
  async getFullScheduleLocalTime() {
    const sheetID = "1Dgw8Iu_UupbrTwnYgy-MAAeHTHQgcgYhgHa93wQk2M4";
    let data = await fetchData(sheetID, "4");
    data = data.map(event => this.convertToLocalTime(event));
    let partitionedDates = [];
    data.forEach(event => {
      let start = event["Start Time"];
      let day = start.format("dddd, MMMM Do");
      if (partitionedDates.length == 0) {
        partitionedDates.push({ [day]: [] });
      } else if (
        Object.keys(partitionedDates[partitionedDates.length - 1])[0] != day
      ) {
        partitionedDates.push({ [day]: [] });
      }
      event["Time"] =
        event["Start Time"].format("h:mm a") +
        "-" +
        event["End Time"].format("h:mm a z");
      partitionedDates[partitionedDates.length - 1][day].push(event);
    });
    return partitionedDates;
  }
  // TODO: Fix
  async getFullScheduleEST() {
    const sheetID = "1Dgw8Iu_UupbrTwnYgy-MAAeHTHQgcgYhgHa93wQk2M4";
    let data = await fetchData(sheetID, "4");
    data = data.map(event => this.convertToEST(event));
    let partitionedDates = [];
    data.forEach(event => {
      let start = event["Start Time"];
      let day = start.format("dddd, MMMM Do");
      if (partitionedDates.length == 0) {
        partitionedDates.push({ [day]: [] });
      } else if (
        Object.keys(partitionedDates[partitionedDates.length - 1])[0] != day
      ) {
        partitionedDates.push({ [day]: [] });
      }
      event["Time"] =
        event["Start Time"].format("h:mm a") +
        "-" +
        event["End Time"].format("h:mm a z");
      partitionedDates[partitionedDates.length - 1][day].push(event);
    });
    return partitionedDates;
  }

  convertToEST(event) {
    event["Start Time"] = moment.tz(event["Start Time"], "America/New_York");
    event["End Time"] = moment.tz(event["End Time"], "America/New_York");
    return event;
  }
  convertToLocalTime(event) {
    event["Start Time"] = moment
      .tz(event["Start Time"], "America/New_York")
      .tz(moment.tz.guess());
    event["End Time"] = moment
      .tz(event["End Time"], "America/New_York")
      .tz(moment.tz.guess());
    return event;
  }

  async listAllEvents() {
    const sheetID = "1Dgw8Iu_UupbrTwnYgy-MAAeHTHQgcgYhgHa93wQk2M4";
    let data = await fetchData(sheetID, "4");
    data = data.map(event => this.convertToEST(event));
    return data;
  }
}

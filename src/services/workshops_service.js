import fetchData from "./sheets_to_json";

export default class WorkshopsService {
  async getAllWorkshops() {
    const sheetID = "15L2munTuAObRbaxE48rTaveJnVm_iC5uJCEDYt82y9E";
    let response = await fetchData(sheetID, "1");
    //TODO: handle timezones
    return response;
  }
}

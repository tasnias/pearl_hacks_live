import fetchData from "./sheets_to_json";

export default class FaqService {
  getAllFAQs() {
    const sheetID = "1BGIwq8YTtXVaFZjRDPbZcZNe06KYFepPu3CG1lvyVpM";
    let response = [];

    // Beginner FAQ
    fetchData(sheetID, "1").then(data => {
      response.push({
        title: "Beginner's FAQ",
        data: data.filter(faq => faq != null)
      });
    });

    // General FAQ
    fetchData(sheetID, "2").then(data => {
      response.push({
        title: "General FAQ",
        data: data.filter(faq => faq != null)
      });
    });

    // Guidelines
    fetchData(sheetID, "3").then(data => {
      response.push({
        title: "Guidelines",
        data: data.filter(faq => faq != null)
      });
    });

    return response;
  }
}

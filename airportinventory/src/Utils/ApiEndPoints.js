export const BaseUrl = "http://airportinventory.me";

export const API_ENDPOINTS = {
  login: BaseUrl + "/Account/login",
  addAirport: BaseUrl + "/Dashboard/AddAirport",
  getAirportData: BaseUrl + "/Dashboard/GetAirportData",
  getAircraftData: BaseUrl + "/Dashboard/GetAircraftData",
  addAircraft: BaseUrl + "/Dashboard/AddAircraft",
  addTransaction: BaseUrl + "/Transaction/AddTransaction",
  reverseTransaction: BaseUrl + "/Transaction/ReverseTransaction",
  getTransactionData: BaseUrl + "/Transaction/GetTransactionData",
};

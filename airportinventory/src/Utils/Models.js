export class AirportModel {
    airport_id = Math.floor((Math.random() * 9999) + 1);
    airport_name = '';
    fuel_capacity_available = ''
}
export class AircraftModel {
    aircraft_id = Math.floor((Math.random() * 9999) + 1);
    aircraft_no = '';
    airline = '';
}
// export const intialAirports = [
//     { airport_id: 1, airport_name: "Biju Pattanaik International Airport, BBSR", fuel_capacity_available: 10000 },
//     {  airport_id: 2, airport_name: "Netaji Subhas Chandra Airport, Kolkata", fuel_capacity_available: 12000 },
//     {  airport_id: 3, airport_name: "Indira Gandhi International Airport, Delhi", fuel_capacity_available: 14000},
//     {  airport_id: 4, airport_name: "Swami Vivekananda Airport, Raipur", fuel_capacity_available: 8000 },
//     { airport_id: 5, airport_name: "Kempegowda International Airport, Bangalore", fuel_capacity_available: 15000 }
// ]

// export const initialAirCrafts = [
//     { aircraft_id: 1, aircraft_no: "G8-717", airline: "Go Air" },
//     { aircraft_id: 2, aircraft_no: "6E802", airline: "Indigo"},
//     { aircraft_id: 3, aircraft_no: "AK53", airline: "Air Asia" },
//     { aircraft_id: 4, aircraft_no: "AI734", airline: "Air India" },
//     { aircraft_id: 5, aircraft_no: "SG521", airline: "Spice Jet" },
// ]


export class TransactionModel {
    transaction_id = Math.floor((Math.random() * 9999) + 1);
    transaction_date_time = new Date();
    transaction_type = '';
    airport_id = 0;
    aircraft_id = 0;
    quantity = 0;
    transaction_parent_id = 0;
}

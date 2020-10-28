using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AirprtInventory.EDMX;
using AirprtInventory.Models;

namespace AirprtInventory.Business
{
    public class DashboardBusiness
    {
        internal static List<AirportData> GetAirportData()
        {
            using (var context = new AirportInventoryEntities())
            {
                var airportList = context.Airports.
                     Where(h => 1 == 1)
                     .Select(x => new AirportData
                     {
                         airport_id = x.AirportId,
                         airport_name = x.AirportName,
                         fuel_capacity_available = x.Fuel_Capacity_Available,
                     }).ToList();
                if(airportList != null)
                {
                    return airportList;
                }
                else
                {
                    return null;
                }
            }
        }

        internal static List<AircraftData> GetAircraftData()
        {
            using (var context = new AirportInventoryEntities())
            {
                var aircraftList = context.Aircrafts.
                     Where(h => 1 == 1)
                     .Select(x => new AircraftData
                     {
                         aircraft_id = x.AircraftId,
                         airline = x.Airline,
                         aircraft_no = x.Aircraft_No,
                     }).ToList();
                if (aircraftList != null)
                {
                    return aircraftList;
                }
                else
                {
                    return null;
                }
            }
        }

        internal static List<AirportData> PostAirportData(AirportData airportData)
        {
            using (var context = new AirportInventoryEntities())
            {
                Airport newAirport = new Airport()
                {
                    AirportName = airportData.airport_name,
                    Fuel_Capacity_Available = airportData.fuel_capacity_available
                };
                context.Airports.Add(newAirport);
                context.SaveChanges();
                var airportList = context.Airports.
                     Where(h => 1 == 1)
                     .Select(x => new AirportData
                     {
                         airport_id = x.AirportId,
                         airport_name = x.AirportName,
                         fuel_capacity_available = x.Fuel_Capacity_Available,
                     }).ToList();
                if (airportList != null)
                {
                    return airportList;
                }
                else
                {
                    return null;
                }
            }
        }

        internal static List<AircraftData> PostAircraftData(AircraftData aircraftData)
        {
            using (var context = new AirportInventoryEntities())
            {
                Aircraft newAircraft = new Aircraft()
                {
                    Aircraft_No = aircraftData.aircraft_no,
                    Airline = aircraftData.airline
                };
                context.Aircrafts.Add(newAircraft);
                context.SaveChanges();
                var aircraftList = context.Aircrafts.
                     Where(h => 1 == 1)
                     .Select(x => new AircraftData
                     {
                         aircraft_id = x.AircraftId,
                         airline = x.Airline,
                         aircraft_no = x.Aircraft_No,
                     }).ToList();
                if (aircraftList != null)
                {
                    return aircraftList;
                }
                else
                {
                    return null;
                }
            }

        }
    }
}
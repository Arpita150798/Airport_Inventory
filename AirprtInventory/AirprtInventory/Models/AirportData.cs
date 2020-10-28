using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirprtInventory.Models
{
    public class AirportData
    {
        public int airport_id { get; set; }
        public string airport_name { get; set; }
        public int fuel_capacity_available { get; set; }
    }
    public class AircraftData
    {
        public int aircraft_id { get; set; }
        public string airline { get; set; }
        public string aircraft_no { get; set; }
    }
    public class TransactionData
    {
        public int transaction_id { get; set; }
        public int? aircraft_id { get; set; }
        public int airport_id { get; set; }
        public int quantity { get; set; }
        public string transaction_date_time { get; set; }
        public string transaction_type { get; set; }
        public int? transaction_parent_id { get; set; }



    }
}
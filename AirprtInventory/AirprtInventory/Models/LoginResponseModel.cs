using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirprtInventory.Models
{
    public class LoginResponseModel
    {
        public int userId { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public bool isLoggedIn { get; set; }
        public string password { get; set; }
    }
}
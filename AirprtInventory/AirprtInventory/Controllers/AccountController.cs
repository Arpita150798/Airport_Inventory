using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirprtInventory.Business;
using AirprtInventory.Models;

namespace AirprtInventory.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        
        public JsonResult Login(UserLogin model)
        {
            try
            {
                var result = AccountBusiness.Login(model);
                if(result != null)
                {
                    //var response = "Success";
                    return new JsonResult { Data = result };
                }
                else{
                    return new JsonResult { Data = "Error!!" };
                }
               
            }
            catch (Exception ex)
            {
                return new JsonResult { Data = ex.Message };
            }
        }
    }
}
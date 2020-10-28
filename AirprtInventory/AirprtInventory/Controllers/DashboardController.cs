using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirprtInventory.Business;
using AirprtInventory.Models;

namespace AirprtInventory.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAirportData()
        {
            try
            {
                var result = DashboardBusiness.GetAirportData();
                if (result != null)
                {
                    return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
                else
                {
                    return new JsonResult { Data = "Error!!" };
                }

            }
            catch (Exception ex)
            {
                return new JsonResult { Data = ex.Message };
            }
        }
        [HttpGet]
        public JsonResult GetAircraftData()
        {
            try
            {
                var result = DashboardBusiness.GetAircraftData();
                if (result != null)
                {
                    return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
                else
                {
                    return new JsonResult { Data = "Error!!" };
                }

            }
            catch (Exception ex)
            {
                return new JsonResult { Data = ex.Message };
            }
        }
        public JsonResult AddAirport(AirportData airportData)
        {
            try
            {
                var result = DashboardBusiness.PostAirportData(airportData);
                if (result != null)
                {
                    return new JsonResult { Data = result };
                }
                else
                {
                    return new JsonResult { Data = "Error!!" };
                }

            }
            catch (Exception ex)
            {
                return new JsonResult { Data = ex.Message };
            }
        }
        public JsonResult AddAircraft(AircraftData aircraftData)
        {
            try
            {
                var result = DashboardBusiness.PostAircraftData(aircraftData);
                if (result != null)
                {
                    return new JsonResult { Data = result };
                }
                else
                {
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
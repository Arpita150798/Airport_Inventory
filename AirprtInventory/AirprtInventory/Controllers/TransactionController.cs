using AirprtInventory.Business;
using AirprtInventory.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirprtInventory.Controllers
{
    public class TransactionController : Controller
    {
        // GET: Transaction
        public ActionResult Index()
        {
            return View();
        }
        public string Hello()
        {
            return "Working";
        }
        public JsonResult AddTransaction(TransactionData newTransaction)
        {
            try
            {
                var transactions = TransactionBusiness.PostTransactionData(newTransaction);
                if (transactions != null)
                {
                    return new JsonResult { Data = transactions };
                }
                else
                {
                    return new JsonResult { Data = "Error!!" };
                }

            }
            catch (Exception ex)
            {
                return new JsonResult { Data = ex };
            }
        }
        public JsonResult GetTransactionData()
        {
            try
            {
                var transactions = TransactionBusiness.GetTransactionData();
                if (transactions != null)
                {
                    return new JsonResult { Data = transactions, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
                else
                {
                    return new JsonResult { Data = "Error!!" };
                }

            }
            catch (Exception ex)
            {
                return new JsonResult { Data = ex };
            }
        }
    }
}
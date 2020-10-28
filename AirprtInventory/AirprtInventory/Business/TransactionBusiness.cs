using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AirprtInventory.EDMX;
using AirprtInventory.Models;

namespace AirprtInventory.Business
{
    public class TransactionBusiness
    {
        internal static List<TransactionData> PostTransactionData(TransactionData addTransaction)
        {
            using (var context = new AirportInventoryEntities())
            {
                bool type = false;
                //context.SaveChanges();
                if (addTransaction.transaction_type == "IN")
                {
                    type = true;
                    addTransaction.transaction_parent_id = null;
                    addTransaction.aircraft_id = null;
                    var updateAirport = context.Airports.
                            Where(x => x.AirportId == addTransaction.airport_id).Select(u => u).FirstOrDefault();
                    if (updateAirport != null)
                    {
                        updateAirport.Fuel_Capacity_Available += addTransaction.quantity;
                    }
                    Transaction newTransaction = new Transaction()
                    {
                        Transaction_DateTime = DateTime.Parse(addTransaction.transaction_date_time),
                        Quantity = addTransaction.quantity,
                        Airport_Id = addTransaction.airport_id,
                        Aircraft_Id = addTransaction.aircraft_id,
                        Transaction_Type = type,
                        Transaction_Parent_Id = addTransaction.transaction_parent_id

                    };
                    context.Transactions.Add(newTransaction);
                    context.SaveChanges();
                }
                else if(addTransaction.transaction_type == "OUT")
                {
                    type = false;
                    addTransaction.transaction_parent_id = null;
                    var updateAirport = context.Airports.
                            Where(x => x.AirportId == addTransaction.airport_id).Select(u => u).FirstOrDefault();
                    if (updateAirport != null)
                    {
                        updateAirport.Fuel_Capacity_Available -= addTransaction.quantity;
                    }
                    Transaction newTransaction = new Transaction()
                    {
                        Transaction_DateTime = DateTime.Parse(addTransaction.transaction_date_time),
                        Quantity = addTransaction.quantity,
                        Airport_Id = addTransaction.airport_id,
                        Aircraft_Id = addTransaction.aircraft_id,
                        Transaction_Type = type,
                        Transaction_Parent_Id = addTransaction.transaction_parent_id

                    };
                    context.Transactions.Add(newTransaction);
                    context.SaveChanges();

                }
               
                var transactionList = context.Transactions.
                     Where(h => 1 == 1).ToList();
                List<TransactionData> allTransaction = new List<TransactionData>();
                string transactionType = "";
                if (transactionList != null)
                {
                   foreach(var transaction in transactionList)
                   {
                        if (transaction.Transaction_Type)
                        {
                            transactionType = "IN";
                        }
                        else
                        {
                            transactionType = "OUT";
                        }
                        TransactionData transactionData = new TransactionData()
                        {

                            transaction_id = transaction.Transaction_Id,
                            transaction_date_time = transaction.Transaction_DateTime.ToString(),
                            aircraft_id = transaction.Aircraft_Id,
                            airport_id = transaction.Airport_Id,
                            transaction_type = transactionType,
                            quantity = transaction.Quantity,
                            transaction_parent_id = transaction.Transaction_Parent_Id

                        };
                        allTransaction.Add(transactionData);
                   }
                    return allTransaction;
                }
                else
                {
                    return null;
                }
            }
        }

        internal static List<TransactionData> GetTransactionData()
        {
            using (var context = new AirportInventoryEntities())
            {
                var transactionList = context.Transactions.
                     Where(h => 1 == 1).ToList();
                List<TransactionData> allTransaction = new List<TransactionData>();
                string transactionType = "";
                if (transactionList != null)
                {
                    foreach (var transaction in transactionList)
                    {
                        if (transaction.Transaction_Type)
                        {
                            transactionType = "IN";
                        }
                        else
                        {
                            transactionType = "OUT";
                        }
                        TransactionData transactionData = new TransactionData()
                        {

                            transaction_id = transaction.Transaction_Id,
                            transaction_date_time = transaction.Transaction_DateTime.ToString(),
                            aircraft_id = transaction.Aircraft_Id,
                            airport_id = transaction.Airport_Id,
                            transaction_type = transactionType,
                            quantity = transaction.Quantity,
                            transaction_parent_id = transaction.Transaction_Parent_Id

                        };
                        allTransaction.Add(transactionData);
                    }
                    return allTransaction;
                }
                else
                {
                    return null;
                }
            }
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AirprtInventory.EDMX;
using AirprtInventory.Models;

namespace AirprtInventory.Business
{
    public class AccountBusiness
    {
        internal static object Login(UserLogin model)
        {
            using (var context = new AirportInventoryEntities())
            {
                //model.password = CommonFunctions.CustomEncryptString(model.password, EncryptionKey.LoginPartialEncKey);
                var user = context.Users.FirstOrDefault(x => x.UserEmail == model.email && x.Password == model.password);
                if (user != null)
                {
                    return new LoginResponseModel()
                    {
                        email = user.UserEmail,
                        firstName = user.UseName,
                        userId = user.UserId,
                        isLoggedIn = user.IsLoggedIn,
                        password = user.Password
                    };
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
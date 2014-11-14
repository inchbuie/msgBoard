using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace MessageBoard
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //find json formatter being used (assume first one)
            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            //set formatting to use camel case (instead of capitalized properties)
            jsonFormatter.SerializerSettings.ContractResolver =
                new CamelCasePropertyNamesContractResolver();

            //default webapi route
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            // hard-code Topics Controller since we know only topics & topic-related data is exposed via API
            // custom route to get replies for a given topic (topicid is required so not specified as with optional reply id)
            config.Routes.MapHttpRoute(
                name: "RepliesRouteApi",
                routeTemplate: "api/v1/topics/{topicid}/replies/{id}",
                defaults: new { controller = "replies", id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/v1/topics/{id}",
                defaults: new { controller= "topics", id = RouteParameter.Optional }
            );

            // Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
            // To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
            // For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
            //config.EnableQuerySupport();
        }
    }
}
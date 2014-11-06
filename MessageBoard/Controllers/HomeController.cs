using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MessageBoard.Models;
using MessageBoard.Services;

namespace MessageBoard.Controllers
{
    public class HomeController : Controller
    {
        private IMailService _mailSvc;

        public HomeController()
        {
            _mailSvc = new MailService();
        }
        public HomeController(IMailService mailSvc)
        {
            _mailSvc = mailSvc;
        }

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        
        [HttpPost]
        public ActionResult Contact(ContactModel model)
        {
            var msg = string.Format("Comment From: {1}{0}Email:{2}{0}Email:{3}{0}Email:{4}{0}",
                Environment.NewLine,
                model.Name,
                model.Email,
                model.Website,
                model.Comment);

            ViewBag.MailSent = _mailSvc.SendMail("noreply@inchbuie.net",
                "edward@inchbuie.net",
                "website contact",
                msg);

            return View();
        }
    }
}

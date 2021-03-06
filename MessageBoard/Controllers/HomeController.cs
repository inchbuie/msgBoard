﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MessageBoard.Models;
using MessageBoard.Services;
using MessageBoard.Data;

namespace MessageBoard.Controllers
{
    public class HomeController : Controller
    {
        private IMailService _mailSvc;
        private IMessageBoardRepository _repo;

        public HomeController(IMailService mailSvc, IMessageBoardRepository repo)
        {
            _mailSvc = mailSvc;
            _repo = repo;
        }

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            var topcs = _repo.GetTopics()
                .OrderByDescending(t => t.Created)
                .Take(25)
                .ToList();

            return View(topcs);
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

        [Authorize]
        public ActionResult MyMessages()
        {
            return View();
        }

        [Authorize(Users="admin")]
        public ActionResult Moderation()
        {
            return View();
        }
    }
}

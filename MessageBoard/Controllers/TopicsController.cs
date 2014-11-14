using MessageBoard.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MessageBoard.Controllers
{
    /// <summary>
    /// WebApi Controller example
    /// </summary>
    public class TopicsController : ApiController
    {
        private IMessageBoardRepository _repo;
        public TopicsController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<Topic> Get(bool includeReplies = false)
        {
            var initialResults = (includeReplies) 
                ? _repo.GetTopicsIncludingReplies() 
                : _repo.GetTopics();

            var topics = initialResults
                   .OrderByDescending(t => t.Created)
                   .Take(50)
                   .ToList();

            return topics;
        }

        // Content-Type of client request must be application/json!
        // using [FromBody] attribute to specify object is from body, not a query parameter
        public HttpResponseMessage Post([FromBody]Topic newTopic)
        {
            if (newTopic.Created == default(DateTimeOffset))
            {
                newTopic.Created = DateTime.UtcNow;
            }

            var response = HttpStatusCode.BadRequest;
            if (_repo.AddTopic(newTopic) && _repo.Save())
            {
                response = HttpStatusCode.Created;
            }
            return Request.CreateResponse(response, newTopic);
        }
    }
}

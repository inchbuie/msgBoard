using MessageBoard.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MessageBoard.Controllers
{
    public class RepliesController : ApiController
    {
        private IMessageBoardRepository _repo;

        public RepliesController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<Reply> Get(int topicId)
        {
            return _repo.GetRepliesByTopic(topicId);
        }

        public HttpResponseMessage Post(int topicId, [FromBody]Reply newReply)
        {
            newReply.TopicId = topicId;
            if (newReply.Created == default(DateTimeOffset))
            {
                newReply.Created = DateTime.UtcNow;
            }

            var response = HttpStatusCode.BadRequest;
            if (_repo.AddReply(newReply) && _repo.Save())
            {
                response = HttpStatusCode.Created;
            }
            return Request.CreateResponse(response, newReply);
        }
    }
}

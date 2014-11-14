using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessageBoard.Data
{
    public class MessageBoardRepository : IMessageBoardRepository
    {
        MessageBoardContext _ctx;
        public MessageBoardRepository(MessageBoardContext context)
        {
            _ctx = context;
        }

        public IQueryable<Topic> GetTopics()
        {
            return _ctx.Topics;
        }
        
        public IQueryable<Topic> GetTopicsIncludingReplies()
        {
            return _ctx.Topics.Include("Replies");
        }

        public IQueryable<Reply> GetRepliesByTopic(int topicId)
        {
            return _ctx.Replies.Where(r => r.TopicId == topicId);
        }

        public bool Save()
        {
            try
            {
                return _ctx.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                //TODO logging
                var msg = ex.Message;
                return false;
            }
        }

        /// <summary>
        /// Does not save to database - just adds topic to context
        /// </summary>
        /// <param name="newTopic"></param>
        /// <returns></returns>
        public bool AddTopic(Topic newTopic)
        {
            try
            {
                _ctx.Topics.Add(newTopic);
                return true;
            }
            catch (Exception ex)
            {
                //TODO logging
                var msg = ex.Message;
                return false;
            }
        }

        public bool AddReply(Reply newReply)
        {
            try
            {
                _ctx.Replies.Add(newReply);
                return true;
            }
            catch (Exception ex)
            {
                //TODO logging
                var msg = ex.Message;
                return false;
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;

namespace MessageBoard.Data
{
    public class MessageBoardMigrationsConfiguration 
        : DbMigrationsConfiguration<MessageBoardContext>
    {
        public MessageBoardMigrationsConfiguration()
        {
#if DEBUG
            this.AutomaticMigrationDataLossAllowed = true;
            this.AutomaticMigrationsEnabled = true;
#endif
        }

        protected override void Seed(MessageBoardContext context)
        {
            base.Seed(context);
             
#if DEBUG
            if (!context.Topics.Any())
            {
                var topics = GetTopicSeedData();
                foreach(var topic in topics){
                    context.Topics.Add(topic);
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    var msg = ex.Message;
                }
            }
#endif
        }

        private ICollection<Topic> GetTopicSeedData()
        {
            var topic = new Topic()
            {
                Title = "Big News",
                Created = DateTime.Now,
                Body = "Hey everybody, something really exciting is happening. Do you want to hear about it?",
                Replies = new List<Reply>(){
                        new Reply() {
                            Body="Yes!!!! Tell me",
                            Created=DateTime.Now
                        },
                        new Reply() {
                            Body="What is it? I bet it's not that great.",
                            Created=DateTime.Now
                        },
                        new Reply() {
                            Body="Not really-I'm busy. :-o",
                            Created=DateTime.Now
                        }
                    }
            };
            var secondTopic = new Topic()
            {
                Title = "Site Announcement",
                Created = DateTime.Now,
                Body = "Attention everybody. The site will be down Sunday morning at 6am for maintenance."
            };

            return new List<Topic>() { topic, secondTopic };
        }
    }
}

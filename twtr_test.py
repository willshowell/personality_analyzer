import os
import json
import html
from application_only_auth import Client
import indicoio as i
import operator

# Look around my environment for api keys
CONSUMER_SECRET = os.environ["TWITTER_SECRET"]
CONSUMER_KEY = os.environ["TWITTER_KEY"]
INDICO_KEY = os.environ["INDICO_KEY"]

# Create twitter and indico objects
twitter = Client(CONSUMER_KEY, CONSUMER_SECRET)
i.config.api_key = INDICO_KEY

persona_mapping = {
    "architect": "intj",
    "logician": "intp",
    "commander": "entj",
    "debater": "entp",
    "advocate": "infj",
    "mediator": "infp",
    "protagonist": "enfj",
    "compaigner": "enfp",
    "logistician": "istj",
    "defender": "isfj",
    "executive": "estj",
    "consul": "esfj",
    "virtuoso": "istp",
    "adventurer": "isfp",
    "entrepreneur": "estp",
    "entertainer": "esfp"
}

# Use this to build a url from dict keys n values
def dict_to_query(d):
  query = "?"
  for key in d.keys():
    query += str(key) + "=" + str(d[key]) + "&"
  return query[:-1]

# Get the inputs
username = input("Give me a twitter handle: ")
count = input("How many tweets to include: ")
rts = input("Include retweets [Yn]?: ")

include_rts = True
if "n" in rts:
    include_rts = False
    print("Ignoring retweets")

#TODO make sure something was input here ^

# Generate twitter api request
request_url = "https://api.twitter.com/1.1/statuses/user_timeline.json"
request_param = {
    "screen_name": username,
    "count": count,
    "include_rts": include_rts,
}

# timeline comes back as a list of dicts
timeline = twitter.request(request_url + dict_to_query(request_param))

# get the id of the last tweet received
oldest_id = timeline[-1]["id"]

# add each tweet text to a list
tweets = []
for tweet in timeline:
    if "retweeted_status" in tweet:
        tweets.append(tweet["retweeted_status"]["text"])
    else:
        tweets.append(tweet["text"])

# clean up those escape chars, @user, and http links
for index, tweet in enumerate(tweets):
    clean_tweet = tweet
    clean_tweet = html.unescape(clean_tweet)
    clean_tweet = " ".join(filter(lambda x:x[0]!="@", clean_tweet.split()))
    clean_tweet = " ".join(filter(lambda x:x[:4]!="http", clean_tweet.split()))
    tweets[index] = clean_tweet
    
print("There are " + str(len(tweets)) + " about to be printed!")
print("\n-\n".join(tweets))
exit()    

# join the tweets into a big ol paragraph
combined_tweets = " ".join(tweets)

# get some sweet stats
sentiment = i.sentiment(combined_tweets)
personas = i.personas(combined_tweets)
political = i.political(combined_tweets)

# sorty sort
sorted_personas = sorted(personas.items(), 
                         key=operator.itemgetter(1), 
                         reverse=True)
sorted_political = sorted(political.items(),
                          key=operator.itemgetter(1),
                          reverse=True)

print()
print(sorted_personas[:3])
print(sorted_political[0])
print(sentiment)

# Show rate limit status for this application
#status = twitter.rate_limit_status()
#print(status["resources"]["search"])

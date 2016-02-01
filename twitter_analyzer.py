import os
import analyzer
import html
from application_only_auth import Client

# get the keys from the environment
twitter = Client(os.environ["TWITTER_KEY"],
                 os.environ["TWITTER_SECRET"])

# Use this to build a url from dict keys n values
def dict_to_query(d):
  query = "?"
  for key in d.keys():
    query += str(key) + "=" + str(d[key]) + "&"
  return query[:-1]

# return a dict of all analysis results
def analyze(handle, count, include_retweets):
	
	request_size = 100
	
	# Initialize response
	success = True
	data = {}
	message = "Failure in analyzing tweets"
	
	# grab all the tweets
	timeline = []
	tweets = []
	
	request_url = "https://api.twitter.com/1.1/statuses/user_timeline.json"
	request_param = {
		"screen_name": handle,
		"count": min(request_size, count),
		"include_rts": include_retweets
	}
	
	processed_tweets = 0
	
	requests = 0
	while len(timeline) < count:
		# grab the next batch of tweets
		new_tweets = twitter.request(
		                request_url + dict_to_query(request_param)
	                 )
		
		# if none were grabbed, it's time to quit
		if len(new_tweets) == 0:
			break
		
		# add them to the current list
		timeline.extend(new_tweets)
		
		# update the end of the group to only request older ones next time
		request_param['max_id'] = int(timeline[-1]['id']) - 1
		
		# make sure not to collect more than desireds
		request_param['count'] = min(request_size, count-len(timeline))
		
		requests += 1
	
	print("Made {} requests to find {} tweets".format(requests, len(timeline)))
	
	# Grab the text from each tweet and put it in tweets
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
	    
	    
	    # add end punction if there wasn't any
	    if clean_tweet:
		    if clean_tweet[-1] not in '.!?':
		    	clean_tweet = "".join((clean_tweet, '.'))
	    
	    tweets[index] = clean_tweet
	
	# assemble them into a paragraph or two
	text = " ".join(tweets)
	
	# analyze them
	try:
		data = analyzer.gimme_the_goods(text)
	except:
		success = False
	
	# if everything is hunky dory, return full analysis, 
	# otherwise send failure and message
	return_dict = {
		'success': success,
	}
	if success:
		return_dict['data'] = data
	else:
		return_dict['message'] = message
		
	return_dict['text'] = text
		
	return_dict['tweet_count'] = len(tweets)
	
	return return_dict
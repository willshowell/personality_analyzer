import analyzer

# return a dict of all analysis results
def analyze(handle, count, include_retweets):
	
	# Initialize response
	success = True
	data = {}
	message = "Failure in analyzing tweets"
	
	# grab all the tweets
	timeline = []
	tweets = []
	
	# assemble them into a paragraph or two
	text = "I want to save the world with my new eco-friendly car."
	
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
	
	return return_dict
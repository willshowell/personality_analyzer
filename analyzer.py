import os
import indicoio
import operator

import traceback

import sys

# Get the key from the environment
indicoio.config.api_key = os.environ["INDICO_KEY"]

persona_mapping = {
    "architect": "intj",
    "logician": "intp",
    "commander": "entj",
    "debater": "entp",
    "advocate": "infj",
    "mediator": "infp",
    "protagonist": "enfj",
    "campaigner": "enfp",
    "logistician": "istj",
    "defender": "isfj",
    "executive": "estj",
    "consul": "esfj",
    "virtuoso": "istp",
    "adventurer": "isfp",
    "entrepreneur": "estp",
    "entertainer": "esfp"
}

def truncate_values(thing, roundness):
	if type(thing) == dict:
		new_thing = {}
		for key, value in thing.items():
			new_thing[key] = round(value, roundness)
		return new_thing
	elif type(thing) == float:
		return round(thing, roundness)
	else:
		return None

def gimme_the_goods(text, tag_count=3, persona_count=3):
		
	# Consume some of that api for analysis
	sentiment = indicoio.sentiment(text)
	political = indicoio.political(text)
	personality = indicoio.personality(text)
	personas = indicoio.personas(text)
	tags = indicoio.text_tags(text, top_n=tag_count)

	# Sort the personas to grab top ones
	top_personas = dict(sorted(personas.items(),
	                    key=operator.itemgetter(1),
	                    reverse=True)[:persona_count])
	
	# Truncate the values to 3 decimals for cleanliness
	roundness = 3
	sentiment = truncate_values(sentiment, roundness)
	political = truncate_values(political, roundness)
	personality = truncate_values(personality, roundness)
	top_personas = truncate_values(top_personas, roundness)
	tags = truncate_values(tags, roundness)
	
	# Rearrange the personas a bit
	final_personas = []
	for key, value in top_personas.items():
		final_personas.append({
			'type': persona_mapping[key],
			'name': key,
			'value': value,
		})
	
	return_dict = {
		'sentiment': sentiment,
		'political': political,
		'personality': personality,
		'personas': final_personas,
		'tags': tags
	}

	return return_dict
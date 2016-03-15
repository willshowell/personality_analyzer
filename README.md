# Personality Analyzer

> profile your profile

The [Personality Analyzer](http://personality-analyzer.herokuapp.com) app collects your tweets to determine basic personality traits. It is built around the Twitter and Indico APIs.

---

## Installation

```
mkvirtualenv personality_analyzer -p python3
pip install -r requirements.txt
python app.p
```

#### Organization

Backend code is in `app.py`, `twitter_analyzer.py`, and `analyzer.py`. Frontend code can be found in `react/js` and `static/css`.

#### Building

Update a python file will automatically restart the local server.

To build the React app, use `npm run build`.

## Technology

- Flask / Python 3
- React
- Semantic UI

## Coming Soon

- Parsing a Medium account
- Clean up Twitter aggregation
- Aggregate segments of Tweets rather than the entire block

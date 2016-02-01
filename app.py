from flask import (Flask, render_template, redirect, url_for,
                   request, jsonify)

import twitter_analyzer as ta

DEBUG = True
HOST = '127.0.0.1'
PORT = 8000

app = Flask(__name__) 

@app.route('/')
def index():
    return render_template('layout.html')
    
@app.route('/_twitter')
def twitter():
    handle = request.args.get('handle', 'jack' , type=str)
    include_retweets = request.args.get('include_retweets', True, type=bool)
    count = request.args.get('count', 0, type=int)
    
    # build a temp JSON object
    return_dict = {
        'success': False,
        'message': 'Failure in obtaining or analyzing tweets'
    }
    
    # Run the analysis with the arguments
    try:
        return_dict = ta.analyze(handle=handle,
                                 include_retweets=include_retweets,
                                 count=count)
    except:
        pass
    
    return jsonify(return_dict)
    
@app.route('/_medium')
def medium():
    handle = request.args.get('handle', 'ev', type=str)
    count = request.args.get('count', 0, type=int)
    return_dict = {
        'success': False,
        'message': 'Feature not supported'
    }
    return jsonify(return_dict)
    
@app.route('/_reddit')
def reddit():
    handle = request.args.get('handle', 'spez', type=str)
    count = request.args.get('count', 0, type=int)
    return_dict = {
        'success': False,
        'message': 'Feature not supported'
    }
    return jsonify(return_dict)
    
    
if __name__ == '__main__':
    app.run(debug=DEBUG, host=HOST, port=PORT)
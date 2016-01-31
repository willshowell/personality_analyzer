from flask import (Flask, render_template, redirect, url_for,
                   request, jsonify)

DEBUG = True
HOST = '127.0.0.1'
PORT = 8000

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('layout.html')
    
@app.route('/_twitter')
def twitter():
    handle = request.args.get('handle', 'jack' ,type=str)
    include_retweets = request.args.get('include_retweets', True, type=bool)
    count = request.args.get('count', 0, type=int)
    
    # build a temp JSON object
    return_dict = {
        'success': False,
        'message': 'Will Trump win the nomination?'
    }
    
    # Run the analysis with the arguments
    
    return jsonify(return_dict)
    
    
if __name__ == '__main__':
    app.run(debug=DEBUG, host=HOST, port=PORT)
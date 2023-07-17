from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.sentiment import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()


def get_sentiment_color(sentiment_score):
    if sentiment_score > 0:
        return '#8dee00'
    elif sentiment_score < 0:
        return '#d60000'
    return '#808080'

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/',methods=['GET'])
def sentiment():
    return "content-sentiment.py"

# Define an API endpoint
#lets see
@app.route('/sentiment-color', methods=['POST'])
def color():
    # Get the input data from the request
    content = request.get_json()
    sentiment = sia.polarity_scores(content["data"])
    return get_sentiment_color(sentiment['compound'])

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)

from flask import Flask, render_template, request, jsonify
from LangTutor import LangTutor
app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/result", methods = ["POST", "GET"])
def result():
    output = request.form.to_dict()
    name = output["name"]
    
@app.route('/hello')
def hello():
    user_input = request.args.get('input')
    # return 'Hello, world! ' + user_input
    # return LT.get_response(user_input)[0]
    return LT.get_response(user_input)

# @app.route('/gpt')
# def hello(message):
#     return 'Hello, world!'
    
if __name__ == "__main__":
    LT = LangTutor("spanish", "english", "a waiter who wants to know what I want to eat")
    app.run(debug = True, port = 8001)
    

    
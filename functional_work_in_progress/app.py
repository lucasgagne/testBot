from flask import Flask, render_template, request, jsonify
from LangTutor import LangTutor
app = Flask(__name__)

LT = LangTutor("spanish", "english", "a waiter who wants to know what I want to eat")

# @app.route("/set_lang_tutor")
# def set_lang_tutor():
#     global LT
#     LT = LangTutor("English", "english", "a helpful musician")
#     return "LangTutor set successfully"
@app.route("/set_lang_tutor_res")
def set_lang_tutor_res():
    global LT
    LT = LangTutor("spanish", "english", "You are a waiter at a resaurant, start the conversation with 'hi can I get you something to eat?' ")
    return "LangTutor set successfully"
@app.route("/set_lang_tutor_res_eng")
def set_lang_tutor_res_eng():
    global LT
    LT = LangTutor("english", "english", "You are a waiter at a resaurant, start the conversation with 'hi can I get you something to eat?' ")
    return "LangTutor set successfully"

@app.route("/set_lang_tutor_dog")
def set_lang_tutor_dog():
    global LT
    LT = LangTutor("spanish", "english", "You at a dog park ask 'yo what kinda dog u got?'")
@app.route("/set_lang_tutor_dog_eng")
def set_lang_tutor_dog_eng():
    global LT
    LT = LangTutor("english", "english", "You at a dog park ask 'yo what kinda dog u got?'")


@app.route("/set_lang_tutor_store")
def set_lang_tutor_store():
    global LT
    LT = LangTutor("spanish", "english", "You at a grocery store ask 'what kind of cerial do you get?' ")
@app.route("/set_lang_tutor_store_eng")
def set_lang_tutor_store_eng():
    global LT
    LT = LangTutor("english", "english", "You at a grocery store ask 'what kind of cerial do you get?' ")

@app.route("/set_lang_tutor_port")
def set_lang_tutor_port():
    global LT
    LT = LangTutor("spanish", "english", "You at an airport ask 'where you flying off to?'")
@app.route("/set_lang_tutor_port_eng")
def set_lang_tutor_port_eng():
    global LT
    LT = LangTutor("english", "english", "You at an airport ask 'where you flying off to?'")

@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/result", methods = ["POST", "GET"])
def result():
    output = request.form.to_dict()
    name = output["name"]

@app.route("/")
@app.route('/homepage')
def homepage():
    return render_template('homepage.html')
    
@app.route('/hello')
def hello():
    user_input = request.args.get('input')
    # return 'Hello, world! ' + user_input
    # return LT.get_response(user_input)[0]
    print(LT)
    return LT.get_response(user_input)

@app.route('/test')
def test():
    return render_template('test.html')

    
if __name__ == "__main__":
    # LT = LangTutor("spanish", "english", "a waiter who wants to know what I want to eat")
    app.run(debug = True, port = 8001)
    

    
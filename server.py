from flask import Flask,render_template,request
import WordCandidate

app = Flask(__name__,static_folder='static')

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def post():
    banmen_string = request.form['banmen']
    return_word = WordCandidate.candidator(target=banmen_string)

    return render_template('result.html',posts = return_word)
    
if __name__ == "__main__":
   
    app.run(debug=True,port=5555)

from flask import Flask,render_template,request
import WordCandidate
import payjp
import os
"""
SECRET_KEY = os.environ['SECRET_KEY']
PUBLIC_KEY = os.environ['PUBLIC_KEY']
payjp.api_key = SECRET_KEY
"""
app = Flask(__name__,static_folder='static')

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def post():
    banmen_string = request.form['banmen']
    return_word = WordCandidate.candidator(target=banmen_string)

    return render_template('result.html',posts = return_word)
"""
@app.route('/funding',method=['POST'])
def pay():
    #カード情報を入力し，決済確定ボタンを押してから行われるフェーズ
    amount = request.form['amount']
    customer = payjp.Customer.create(
       card=request.form['payjp-token']
    )
    payjp.Charge.create(
        amount=amount,
        currency='jpy',
        customer=customer.id,
        description='Funding from Bakuzetsu site user'
    )
    return render_template('pay.html', amount=amount)
"""

if __name__ == "__main__":
   
    app.run(debug=True,port=5555)

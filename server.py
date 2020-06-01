from flask import Flask,render_template,request
import WordCandidate
import payjp
import os

SECRET_KEY = 'sk_test_e26c021be10c38d4ab9dbb99'
PUBLIC_KEY = 'pk_test_f53a384e76604c19b1d6b3c1'
payjp.api_key = SECRET_KEY

app = Flask(__name__,static_folder='static')

@app.route('/')
def hello():
    return render_template('index.html',public_key=PUBLIC_KEY)

@app.route('/register', methods=['POST'])
def post():
    banmen_string = request.form['banmen']
    candidate = request.form['priority']
    if len(candidate) == 0:
        print('candidate_word is not specify')
        candidate = None
    return_word = WordCandidate.candidator(target=banmen_string,candidate_char=candidate)
    

    return render_template('result.html',posts = return_word)

@app.route('/pay',methods=['POST'])
def pay():
    #カード情報を入力し，決済確定ボタンを押してから行われるフェーズ
    print('payment phase')
    amount = 1000
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


if __name__ == "__main__":
   
    app.run(debug=True,port=5555)

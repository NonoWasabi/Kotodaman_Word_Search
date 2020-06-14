# -*- coding: utf-8 -*-
import csv
from collections import Counter
import re

WORD_LIST_LENGTH = 6
l = []

word_list = [[] for _ in range(WORD_LIST_LENGTH)]

#theme.txtの情報を受け取るリスト
thema = {}

def check_thema(word,candidate_thema):
        for t in candidate_thema:
            if t in word["theme"]: return True
        return False

def check_char(word,candidate_char):
    for c in candidate_char:
        if c in word["fill_char"]: return True
    return False

def candidator(target=None, candidate_char=None, counter=None, candidate_thema=None,mode='Normal'):
    candidate_words = []
    candidate_fill = []
    satisfied_thema_word = []
    satisfied_char_word = []
    satisfied_both_word = []

    # 文字数指定
    if counter == '4文字':
        start = 2 #以上(2文字なら[0])
        end = 3 #未満
    elif  counter == '5文字':
        start = 3
        end = 4
    elif counter == '5文字以上':
        start = 3
        end = 6
    else:
        start = 4
        end = 6

    # 入ってて欲しいひらがなとテーマを指定
    if target == None:  target = "ぽぷてぴぴっ."
    if candidate_char == None:
        candidate_char = ['い','う','ん']
    else:
        candidate_char = re.sub('(\[|\'|\]|\s)','',candidate_char).split(',')
    if candidate_thema == None: candidate_thema = [1,2,3,4,5]

    # 言葉dbをCSVからファイルの読み込み
    if len(word_list[0]) == 0:
        print('Database Loading...')
        with open("./combine_output.csv","r",encoding='utf-8') as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                if len(row) == 0: continue
                word = row[1]
                word_list[len(word)-2].append({"word":word,"theme":list(map(int,row[2:11]))})

    #テーマ検索機能を有する場合，
    if mode=='Theme':
        if len(thema) == 0:
            print('Theme file Loading...')
            #テーマファイルの読み込み
            with open("./theme.txt","r",encoding='utf-8') as f:
                for row in f:
                    text = row.split(",")
                    for i in range(len(text)//2):
                        thema[int(text[i*2])] = text[i*2+1]

    #条件にあう単語を抜き出し
    for xth_words in word_list[start:end]: #xth_wordsにcsv1行ごとを代入していく
        for word_dic in xth_words: #word_dicに代入された文字を代入していく
            word_len = len(word_dic["word"]) #word_lenは代入された単語のの文字数
            word = word_dic["word"] #word: リストの中の単語
            wordandcircle = []

            for left in range(WORD_LIST_LENGTH - word_len + 2):
                flag = True
                for j in range(word_len):
                    index = left + j
                    if target[index] != word[j] and target[index] != '.':
                        flag = False

                if flag:
                    for leftcircle in range(left):
                        wordandcircle.append("〇")
                    for k in range(word_len):
                            wordandcircle.append(word[k])
                    for rightcircle in range(index, WORD_LIST_LENGTH):
                        wordandcircle.append("〇")
                    STRwordandcircle = "".join(wordandcircle)
                    fill_char = set()
                    word_count = Counter(word)
                    target_count = Counter(target)
                    for c,v in word_count.items():
                        if v > target_count[c]: fill_char.add(c)

                    candidate_words.append({
                        "word": STRwordandcircle,
                        "theme": word_dic["theme"],
                        "fill_char": fill_char
                        })

    # 条件にそう単語を抽出するフロー群
    for word in candidate_words:
        #if check_thema(word,chandidate_thema) and check_char(word,candidate_char): satisfied_both_word.append(word)
        if check_char(word,candidate_char): satisfied_char_word.append(word)
        #if check_thema(word,chandidate_thema): satisfied_thema_word.append(word)

    return satisfied_char_word

    """    
    for word in satisfied_char_word:
        print("word : ",word["word"])
        print("theme : ",word["theme"])
        print(word)


candidator(target='..かいし..')
"""

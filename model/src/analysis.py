from src.utils import (get_raw_text, clean_column)
import pandas as pd
import os
import email
import spacy
from nltk.corpus import stopwords
import vaderSentiment


analyser = SentimentIntensityAnalyzer()


dirname = '/app/data'
filename = 'emails.csv'

e_namefile = os.path.join(dirname, filename)
enron = pd.read_csv(e_namefile, nrows=200)

emails = list(map(email.parser.Parser().parsestr,enron['message']))
headings  = emails[0].keys()

for key in headings:
    enron[key] = [doc[key] for doc in emails]
    
enron['body'] = list(map(get_raw_text, emails))
enron['Subject_new'] = enron['Subject'].apply(clean_column)
enron['body_new'] = enron['body'].apply(clean_column)

tokenizer = RegexpTokenizer(r'\w+')
words_descriptions = enron['body_new'].apply(tokenizer.tokenize)

all_words = [word for tokens in words_descriptions for word in tokens]
enron['description_lengths']= [len(tokens) for tokens in words_descriptions]
VOCAB = sorted(list(set(all_words)))

enron['scores'] = enron['body_new'].apply(lambda review: analyser.polarity_scores(review))
enron['compound'] = enron['scores'].apply(lambda score_dict: score_dict['compound'])
enron['neg'] = enron['scores'].apply(lambda score_dict: score_dict['neg'])
enron['pos'] = enron['scores'].apply(lambda score_dict: score_dict['pos'])
enron['neu'] = enron['scores'].apply(lambda score_dict: score_dict['neu'])

nlp = spacy.load('en_core_web_sm')

doc = nlp(enron['body_new'][14])
for token in doc:
    print(token.text, token.pos_, token.dep_)

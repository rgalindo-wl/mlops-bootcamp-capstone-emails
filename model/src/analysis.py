from src.utils import (get_raw_text, clean_column)
import pandas as pd
import os
import email


dirname = '/app'
filename = 'archivo.csv'

e_namefile = os.path.join(dirname, filename)
enron = pd.read_csv(e_namefile, nrows=200)

emails = list(map(email.parser.Parser().parsestr,enron['message']))
headings  = emails[0].keys()

for key in headings:
    enron[key] = [doc[key] for doc in emails]
    
enron['body'] = list(map(get_raw_text, emails))
enron['Subject_new'] = enron['Subject'].apply(clean_column)
enron['body_new'] = enron['body'].apply(clean_column)
import os
import csv
from os import walk


writer = csv.writer(csv_file)
csv_file = open('maildir.csv', 'w')
csv_header = ['file_path', 'message']
writer.writerow(csv_header)

path = "maildir"
#count = 0
exclude = set(['.DS_Store'])
for root, dirs, files in os.walk(path, topdown=True):
    files[:] = [f for f in files if f not in exclude]
    for file in files:
        file_path = os.path.join(root, file)
        input_file = open(file_path, "r", encoding="utf8", errors='ignore')
        text_file = input_file.read()
        writer.writerow([file_path, str(text_file)])
        #count +=1
#print (count)












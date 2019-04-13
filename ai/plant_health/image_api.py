# Native libraries
import os

# Public libraries
from flask import Flask, request
import disease_classify
import subprocess as sp
import numpy as np

app = Flask()

app.config['UPLOAD_FOLDER'] = 'tmp'

@app.route('/imupload', method=['GET', 'POST'])
def measure_disease():
    if request.method == 'POST':
        f = request.files['file']
        make_tmp_dir()
        answer_str = sp.call(["python3", "disease_classify.py", f]) # add keyword arguments
        disease_classify.run_file()
        rm_tmp_dir()
        return answer_str

def make_tmp_dir():
    tmp_path = os.path.join(os.getcwd(), app.config['UPLOAD_FOLDER'])
    if os.path.isdir(tmp_path):
        print("Warning: Please remove tmp directory from current folder.")
    else:
        os.mkdir(tmp_path)
    return tmp_path

def rm_tmp_dir():
    os.rmdir(app.config['UPLOAD_FOLDER'])

# Native libraries
import os

# Public libraries
from flask import Flask, request, render_template
import disease_classify
import subprocess as sp
import numpy as np

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'tmp'

@app.route("/")
def home():
    return render_template("test_api_page.html")

@app.route('/imupload', methods =['GET', 'POST'])
def measure_disease():
    if request.method == 'POST':
        f = request.files['file']
        make_tmp_dir()
        f.save(os.path.join(app.config['UPLOAD_FOLDER'],f.filename))
        answer_str = sp.call(["python3", "disease_classify.py", f.filename]) # add keyword arguments
        disease_classify.run_file(os.path.join(app.config['UPLOAD_FOLDER'],f.filename))
        #rm_tmp_dir()
        return str(answer_str['disease'])

def make_tmp_dir():
    tmp_path = os.path.join(os.getcwd(), app.config['UPLOAD_FOLDER'])
    if os.path.isdir(tmp_path):
        print("Warning: Please remove tmp directory from current folder.")
    else:
        os.mkdir(tmp_path)
    return tmp_path

def rm_tmp_dir():
    os.rmdir(app.config['UPLOAD_FOLDER'])

if __name__ == "__main__":
    app.run(debug=True)

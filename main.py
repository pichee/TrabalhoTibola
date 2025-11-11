from flask import Flask
import subprocess

app = Flask(__name__)

from views import *

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080,debug=True)

# File Parser Python Flask Server

## Using poetry

```bash
# Creating poetry project
poetry new file-parser-server

# cd to new created folder

# Add Flask
poetry add FLask
```

<br>

---

<br>


## Using venv

#### IMPORTANT HERE WE NEED TO OPENT THE PYTHON PROJECT IN ANOTHER IDE VIEW ELSE IT CANT FIGURE OUT THE VENV IMPORTS

Following steps for config (using macos):

```bash
# Setting up the venv called flaskenv
python3 -m venv flaskenv

# Activating the venv
source flaskenv/bin/activate

# Make sure the venv is activated correctly by this and getting path to venv
which python3

# Installing dep -> flask
python3 -m pip install Flask

# If you want to freeze the req into a dep file do following
pip freeze > requirements.txt

# This file can be used to install the same dependencies in another environment using:
pip install -r requirements.txt
```

Running python flask server:
```bash
python src/app.py
```

Shutting down the venv:
```bash
deactivate
```
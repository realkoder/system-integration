from dotenv import load_dotenv, dotenv_values

import os

print(dotenv_values()["API_KEY"])
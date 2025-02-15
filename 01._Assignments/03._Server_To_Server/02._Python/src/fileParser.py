import os
import csv
import yaml # This is the only thats not build in - using Pyyaml -> https://pypi.org/project/PyYAML/
import json
import xml.etree.ElementTree as ET

async def parse_file(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    data = None
    if ext == ".csv":
        data = await parse_csv(file_path)
    # The installation of pyyaml was a bitch through pip even though using venv????
    elif ext in [".yaml", ".yml"]:
        data = parse_yaml(file_path)
    elif ext == ".json":
        data = parse_json(file_path)
    elif ext == ".txt":
        data = parse_txt(file_path)
    elif ext == ".xml":
        data = await parse_xml(file_path)
    else:
        raise ValueError("Unsupported file format")
    
    return data

async def parse_csv(file_path):
    results = []
    with open(file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            results.append(row)
    return results

def parse_yaml(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return yaml.safe_load(file)

def parse_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def parse_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return {'content': file.read()}

async def parse_xml(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        tree = ET.parse(file)
        return ET.tostring(tree.getroot(), encoding='utf-8').decode('utf-8')
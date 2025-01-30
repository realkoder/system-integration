from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'You need to send a file with the req', 400

    file = request.files['file']
    if file:
        print('FILE IS UPLOADING')
        file_content = file.read()
        file_content_str = file_content.decode('utf-8')

        file_format = file.filename.split('.')[-1]
        
        print('File format is ', file_format)
        print(file_content_str)
        return 'File uploaded successfully', 200
    return 'OK', 400

if __name__ == '__main__':
    print('FLASK_SERVER STARTED ON PORT 8080')
    app.run(debug=True, port=8080)

def read_file(file_name):
    try:
        with open('../00._Files/' + file_name, 'r') as file:
            file_format = file.name.split('.')[-1]
            lines = file.readlines()
            print(file_format)
            print(lines)
    except FileNotFoundError:
        print(f"Error: The file {file_name} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


read_file('text.txt')
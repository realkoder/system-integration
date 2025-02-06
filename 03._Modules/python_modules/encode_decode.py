import base64

def encode_value(value):
    asci_value = value.encode("ascii")
    print(asci_value)
    return base64.b64encode(asci_value)


def decode_value(value):
    return base64.b64decode(value)


value = "HELLO WORLD"

encoded_value = encode_value(value)
print(encoded_value)

decoded_value = decode_value(encoded_value)
print(decoded_value)


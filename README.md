# KEA SoftwareDeveloper - SystemIntegration

## Here will be overall notes and other misc 🧙

### JavaScript

Do have ASI `automatic semicolon insertion`.

### NodeJS

Everything in node is a module. A file is considered a module.


#### NodeJS with Typescript

Had a lot of issues regarding the use of `ES modules` instead of `commonjs` and importing files. First I thought it should be imported with extension `.ts`, which worked when setting the `tsconfig` file up for that. But making use of `"noEmit": true, "allowImportingTsExtensions": true` in tsconfig messed with `npm run build` since the `.ts` files couldn't be imported for the emitted js files. 

This video explains it somehow -> https://www.youtube.com/watch?v=8ORIzvgNWhU

<br>

---

<br>

## Serialization

`Marshalling` is the process where an endpoint accepting an incoming request containing a string in `JSON` format, which could be processed in a `Java` environment using `Jackson's ObjectMapper` to convert the JSON string to a Java object.

<br>

---

<br>

## Python

`Poetry` is a mature build system for Python. It configures a `venv` and sets up a `pyproject.toml` file for specification about project regarding metadata, scripts, dependencies.


```bash
# Initialize with default settings
poetry init -n

# Install dependencies e.g emoji
poetry add emoji

# Init the venv
poetry shell

# Leave the venv
exit
```

To set the `interpreter` to the poetry venv its placed here `/Users/alexanderchristensen/Library/Caches/pypoetry/virtualenvs/03-poetry-RN3a7CP4-py3.13/bin/python` MAKE SURE TO POINT TO THE EXACT NAME `03-poetry-RN3a7CP4-py3.13`.


To fix the issue with `poetry shell` where getting error `The command "shell" does not exist.` Fix it by this -> https://github.com/python-poetry/poetry-plugin-shell

```bash
# The easiest way to install the shell plugin is via the self add command of Poetry.
poetry self add poetry-plugin-shell
```

A simple server is configured by `fastapi` run with `uvicorn` since it's an `ASGI (Asynchronous Server Gateway Interface)`

```bash
# install deps with poetry
poetry add fastapi uvicorn

# Execute main.py with uvicorn
uvicorn main:app --reload
```

### Bonus info

Very nice way to serve html,css,js files for local dev in browser `npx vite`.

Encode a string to base-64 use `btoa` decode use `atob`.

```js
const message = "hello world";

const encoded = btoa(message);
const decoded = atob(encoded);

console.log(encoded);
console.log(decoded);
```

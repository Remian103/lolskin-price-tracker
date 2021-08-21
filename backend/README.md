# Installation
## Install Poetry
https://python-poetry.org/docs/#installation

## Clone repository
```bash
$ git clone https://github.com/Remian103/lolskin-price-tracker.git
```

## Setup environment
```bash
$ cd /path/to/backend/
$ poetry install
```

<br/>
<br/>


# Run
## Run the app on uvicorn
```bash
$ cd /path/to/backend/
$ ./run.sh
or
$ ./run.sh [port_num]
```
The app will run on $(hostname --all-ip-address):port(default=8000), which is often the desired behavior.

Visit
```
localhost:8000/docs
```
for available APIs and their documentation.

<br/>
<br/>


# Activate environment
You can also activate the environment to do some custom call upon the app for testing purpose.

## Activate the environment in a new shell
```bash
$ poetry shell
```

## Activate the environment in current shell
- Linux
    ```bash
    $ source /path/to/venv//bin/activate
    ```
 - Windows
    ```bash
    > source \path\to\venv\Scripts\activate.bat
    ```
<br/>
<br/>


# Update static data
```bash
$ cd /path/to/backend/
$ python -m app.update_static
```
<br/>
<br/>


# Logs
Log files are available in `/path/to/backend/logs`

Note that logs are cleared at next run.
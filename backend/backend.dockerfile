FROM python
WORKDIR /backend/
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false
COPY ./pyproject.toml ./poetry.lock* /backend/
RUN poetry install
COPY ./app/ /backend/app/
ENV PATH="/opt/poetry/venv/bin:${PATH}"
CMD uvicorn app.main:app --reload --host $(hostname --all-ip-address)
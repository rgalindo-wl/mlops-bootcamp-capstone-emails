FROM python:3.8-slim AS base
ENV APP_HOME=/app \
  # python:
    PYTHONDONTWRITEBYTECODE=1 \
    # pip:
    PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_NO_CACHE_DIR=off \
    # poetry:
    POETRY_HOME=/opt/poetry \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=true \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    # virtualenv:
    VENV_PATH=/app/.venv

ENV PATH="${POETRY_HOME}/bin:${PATH}"
ENV PATH="${VENV_PATH}/bin:${PATH}"
WORKDIR ${APP_HOME}

RUN set -ex \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    curl \
    gcc \
    python3-dev \
    && curl -sSL 'https://install.python-poetry.org' | python3 - --version 1.1.11 \
    && poetry --version

COPY pyproject.toml poetry.lock ${APP_HOME}/

RUN poetry install --no-dev

ENTRYPOINT [ "poetry", "run" ,"python" ]

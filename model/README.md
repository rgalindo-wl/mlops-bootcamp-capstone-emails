# Model 

## Build

```docker-compose build```

## Run

```docker-compose up --detach```

To run jupyter notebook you can run

```docker-compose exec -T model /app/entrypoint4jupyter.sh```

Then you need to open [the noteebook](http://localhost:8888) and use the token you have set in your `.env` file.

To run locally you will require to execute:

```docker-compose exec -T model uvicorn src.main:app --reload --host 0.0.0.0 . --ports 80```

## Deploy

Docker image is available at [Docker hub](https://hub.docker.com/r/rgalindowl/mlops-bootcamp-team7/tags)
# Model 

## Build

```docker-compose build```

## Run


```docker-compose up --detach```

To run jupyter notebook you can run

```docker-compose exec -T model /app/entrypoint4jupyter.sh```

Then you need to open [the noteebook](http://localhost:8888) and use the token you have set in your `.env` file.


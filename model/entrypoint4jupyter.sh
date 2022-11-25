#! /bin/bash
jupyter notebook --no-browser --ip=0.0.0.0 --NotebookApp.token=$JUPYTER_TOKEN --NotebookApp.password=$JUPYTER_PASSWORD --allow-root &

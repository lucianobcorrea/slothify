docker-compose down

docker build -t backend-slothify:latest ./api

docker build -t frontend-slothify:latest ./app

docker-compose up --build --force-recreate --remove-orphans
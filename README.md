# urler

Simple Web Application for listing URLs, configurable with a JSON file.

Configure `db.json` to your liking and start the app.

![alt text](https://github.com/defilippomattia/urler/assets/34513340/30475cea-a9c3-46bb-853c-07410424d3c7)

## Start for development

`git clone https://github.com/defilippomattia/urler.git`

#### Backend

```
cd ./backend
go run main.go -config="path/to/db.json"
```

#### Frontend

```
cd ./frontend
yarn add @mantine/core @mantine/hooks
yarn dev
Visit http://localhost:3000
```

## Start docker deployment

```
git clone https://github.com/defilippomattia/urler.git
docker-compose build
docker-compose up
Visit http://localhost:3000
```

# urler

Simple Web Application for listing URLs, configurable with a JSON file.

Configure db.json to your liking and start the app.

## Start for development

`git clone https://github.com/defilippomattia/urler.git`

### Backend

```
cd ./backend
go run main.go -config="path/to/db.json"

```

### Frontend

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

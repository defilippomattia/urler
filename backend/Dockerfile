FROM golang:1.22

WORKDIR /usr/src/urler-backend

COPY ./go.mod .

RUN go mod download && go mod verify

COPY main.go .

RUN go build -v -o /usr/local/bin/urler-backend .

CMD ["urler-backend", "-config=/usr/src/urler-backend/db.json"]
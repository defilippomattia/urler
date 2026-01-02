# urler

Simple dashboard that shows URLs different environments(test, uat, prod...) environments. 
It displays each URL’s name, link, and description in a simple table."

# Running 

```
Change URLs in const db (frontend/App.tsx)
docker compose up --build -d
http://localhost:8855
```

Maybe at some point I will move the const db from the frontend source code and have some backend API to fetch it.

# Screenshot
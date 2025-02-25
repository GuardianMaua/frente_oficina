FROM node:alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM python:3-alpine

WORKDIR /app

RUN pip install flask
RUN pip install gunicorn

COPY --from=build /app/build ./build

COPY app.py ./app.py
COPY creds.txt ./creds.txt

EXPOSE 3002

CMD ["gunicorn", "--bind", "0.0.0.0:3002", "app:app"]


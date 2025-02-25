FROM python:3-alpine

WORKDIR /app

RUN pip install flask
RUN pip install gunicorn

COPY . .

EXPOSE 3003

CMD ["gunicorn", "--bind", "0.0.0.0:3003", "app:app"]
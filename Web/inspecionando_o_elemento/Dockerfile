FROM python:3-alpine

WORKDIR /app

RUN pip install flask
RUN pip install gunicorn

COPY . .

EXPOSE 80

CMD ["gunicorn", "--bind", "0.0.0.0:80", "app:app"]
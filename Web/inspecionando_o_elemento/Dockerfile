FROM python:3-alpine

WORKDIR /app

RUN pip install flask
RUN pip install gunicorn

COPY . .

EXPOSE 3000

CMD ["gunicorn", "--bind", "0.0.0.0:3000", "app:app"]
FROM python:3.10

WORKDIR /app



COPY requirements.txt requirements.txt
RUN  pip install --upgrade pip \
     && pip install -r requirements.txt

COPY . .

EXPOSE 8000


CMD sleep 5 && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
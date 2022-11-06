FROM python:3.10

WORKDIR /app


pip install wheel setuptools pip --upgrade
COPY requirements.txt requirements.txt
RUN  pip install pip==21.3.1\
     && pip install -r requirements.txt

COPY . .

EXPOSE 8000


CMD sleep 5 && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
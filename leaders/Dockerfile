FROM python:3.10

WORKDIR /app


RUN pip install wheel setuptools pip --upgrade
COPY requirements.txt requirements.txt
RUN  pip install tensorflow\
     && pip install pytorch-forecasting\
     && pip install pytorch-lightning\
     && pip install -r requirements.txt

COPY . .

EXPOSE 8000


CMD sleep 5 && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
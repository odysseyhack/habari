FROM library/python

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY plant_health plant_health

RUN pip install flask
RUN pip install numpy
RUN pip install pillow
RUN pip install tensorflow

EXPOSE 5000

CMD ["python3", "plant_health/image_api.py"]

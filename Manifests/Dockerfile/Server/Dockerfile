#Filename: Dockerfile

# Pull base image
FROM ubuntu:latest

# Configure APT
RUN apt update
RUN DEBIAN_FRONTEND="noninteractive" TZ="America/Toronto" apt install -y tzdata
RUN apt install -y build-essential openjdk-11-jdk net-tools python3 python3-pip

# Copy dependencies
RUN mkdir /app
COPY /java-testing/test.py /app
COPY /java-testing/testing.sh /app

# Set working directory
WORKDIR /app

# Set entrypoint (Python)
ENTRYPOINT ["python3"]

# Start app
CMD ["test.py"]
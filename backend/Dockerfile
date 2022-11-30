FROM python:3.8

ARG CHROME_VERSION="google-chrome-stable"

# Provide sudo previleges just in case.
USER root
SHELL [ "/bin/bash", "-c" ]
RUN apt-get update -y
# INSTALLING CHROME AND CHROMEDRIVER
# Referred from https://gist.github.com/varyonic/dea40abcf3dd891d204ef235c6e8dd79
# We need wget to set up the PPA and xvfb to have a virtual screen and unzip to install the Chromedriver
RUN apt-get install -y wget xvfb unzip
# apt-key add - means add to url(denoted by -) to apt key
# -O - sends the output to standard output
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN apt-get update -y
RUN apt-get install -y google-chrome-stable

# Setting up Chromedriver
ARG CHROME_DRIVER_VERSION

RUN if [ -z "$CHROME_DRIVER_VERSION" ]; \
  then CHROME_MAJOR_VERSION=$(google-chrome --version | sed -E "s/.* ([0-9]+)(\.[0-9]+){3}.*/\1/") \
    && NO_SUCH_KEY=$(curl -ls https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_MAJOR_VERSION} | head -n 1 | grep -oe NoSuchKey) ; \
    if [ -n "$NO_SUCH_KEY" ]; then \
      echo "No Chromedriver for version $CHROME_MAJOR_VERSION. Use previous major version instead" \
      && CHROME_MAJOR_VERSION=$(expr $CHROME_MAJOR_VERSION - 1); \
    fi ; \
    CHROME_DRIVER_VERSION=$(wget --no-verbose -O - "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_MAJOR_VERSION}"); \
  fi \
  && echo "Using chromedriver version: "$CHROME_DRIVER_VERSION \
  && wget --no-verbose -O /tmp/chromedriver_linux64.zip https://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip \
  && rm -rf /opt/selenium/chromedriver \
  && unzip /tmp/chromedriver_linux64.zip -d /opt/selenium \
  && rm /tmp/chromedriver_linux64.zip \
  && mv /opt/selenium/chromedriver /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION \
  && chmod 755 /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION \
  && ln -fs /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION /usr/bin/chromedriver

RUN echo "chrome" > /opt/selenium/browser_name

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN python3 -m venv ./.venv

RUN source .venv/bin/activate

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN pip install 'farm-haystack[all-gpu]' --no-cache-dir

# FAISS cpu and gpu versions are not coexistable
RUN pip uninstall faiss-cpu -y

RUN pip install 'fastapi[all]'

COPY ./app /code/app

RUN mkdir -p {/code/Files/PDF, /code/Files/web}

CMD [ "uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "80"]
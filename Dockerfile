FROM node:11

RUN mkdir -p /tmp
WORKDIR /tmp/client

## Run these together otherwise we have to remember to run it with --no-cache
#  occasionally
RUN apt update && \
      apt install -y git build-essential


RUN apt autoremove -y

# RUN git clone https://github.com/minimalchat/client.git /tmp/client
COPY . .

ENV REMOTE_HOST "localhost"
ENV REMOTE_PORT "8000"

# ENV DIGITAL_OCEAN_SPACES_KEY
# ENV CLIENT_KEY


# TODO: Is this the best way to go about supplying the theme details?
# ENV CLIENT_THEME_PRIMARY_COLOUR

# Build the scripts
RUN make dependencies

CMD ["make", "compile"]

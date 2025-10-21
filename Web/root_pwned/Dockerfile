FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p /home/Guardian && \
    echo "GUARDIAN{LF1_W4S_3ASY}" > /home/Guardian/lembretes.txt

RUN echo "FLAG_{root_has_been_pwned!}" > /root/flag.txt

RUN addgroup -S appgroup && adduser -S user -G appgroup

RUN apk add --no-cache sudo bash netcat-openbsd && \
    echo "user ALL=(root) NOPASSWD: /usr/bin/find, /usr/bin/sudo -l" >> /etc/sudoers
USER user
EXPOSE 80
CMD ["node", "index.js"]
FROM node:20-alpine

RUN apk add --no-cache \
    postgresql \
    postgresql-contrib \
    openssh \
    imagemagick \
    sudo \
    bash \
    shadow \
    util-linux \
    netcat-openbsd

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=db

RUN mkdir -p /var/lib/postgresql/data && \
    mkdir -p /run/postgresql && \
    chown -R postgres:postgres /var/lib/postgresql/data && \
    chown -R postgres:postgres /run/postgresql && \
    sudo -u postgres initdb -D /var/lib/postgresql/data

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

RUN adduser -D -s /bin/sh web && \
    adduser -D -s /bin/bash ctfuser && \
    adduser -D -s /bin/bash admin && \
    echo 'ctfuser:ctfpass' | chpasswd && \
    echo 'admin:admin' | chpasswd && \
    echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && \
    echo 'PermitRootLogin no' >> /etc/ssh/sshd_config && \
    (grep -q '^#includedir /etc/sudoers.d' /etc/sudoers || echo '#includedir /etc/sudoers.d' >> /etc/sudoers) && \
    mkdir -p /opt/flags /opt/hints && \
    printf 'MAUA{stage1_jwt_token_decoded_admin}\n' > /opt/flags/flag1.txt && \
    printf 'MAUA{stage2_user_via_ssh}\n' > /opt/flags/flag2.txt && \
    printf 'ctfuser ALL=(root) NOPASSWD: /usr/bin/find\nadmin ALL=(root) NOPASSWD: /usr/bin/find\n' > /etc/sudoers.d/ctf && \
    chmod 0440 /etc/sudoers.d/ctf && \
    printf 'MAUA{stage3_root_privesc_success}\n' > /root/flag3.txt && \
    mkdir -p /home/admin && printf 'MAUA{stage2_user_via_ssh}\n' > /home/admin/user.txt && chown admin:admin /home/admin/user.txt && \
    chmod 0644 /opt/flags/flag1.txt /opt/flags/flag2.txt /home/admin/user.txt && \
    chmod 0600 /root/flag3.txt && \
    printf "export PS1='\\u$\\w '\n" > /etc/profile.d/prompt.sh && \
    mkdir -p /home/admin /home/ctfuser && \
    printf "export PS1='\\u$\\w '\n" > /home/admin/.bashrc && \
    printf "export PS1='\\u$\\w '\n" > /home/ctfuser/.bashrc && \
    chown admin:admin /home/admin/.bashrc && \
    chown ctfuser:ctfuser /home/ctfuser/.bashrc

RUN echo '#!/bin/sh' > /app/start-all.sh && \
    echo 'echo "Creating PostgreSQL directories..."' >> /app/start-all.sh && \
    echo 'mkdir -p /run/postgresql' >> /app/start-all.sh && \
    echo 'chown -R postgres:postgres /run/postgresql' >> /app/start-all.sh && \
    echo 'echo "Starting PostgreSQL..."' >> /app/start-all.sh && \
    echo 'sudo -u postgres postgres -D /var/lib/postgresql/data &' >> /app/start-all.sh && \
    echo 'echo "Waiting for PostgreSQL to start..."' >> /app/start-all.sh && \
    echo 'sleep 5' >> /app/start-all.sh && \
    echo 'while ! pg_isready -h localhost -p 5432 -U postgres; do' >> /app/start-all.sh && \
    echo '    sleep 1' >> /app/start-all.sh && \
    echo 'done' >> /app/start-all.sh && \
    echo 'echo "PostgreSQL is ready!"' >> /app/start-all.sh && \
    echo 'echo "Creating database..."' >> /app/start-all.sh && \
    echo 'sudo -u postgres createdb db' >> /app/start-all.sh && \
    echo 'echo "Checking if init.sql exists..."' >> /app/start-all.sh && \
    echo 'ls -la /app/init.sql' >> /app/start-all.sh && \
    echo 'echo "Initializing database..."' >> /app/start-all.sh && \
    echo 'sudo -u postgres psql -d db -f /app/init.sql' >> /app/start-all.sh && \
    echo 'echo "Starting SSH daemon..."' >> /app/start-all.sh && \
    echo 'mkdir -p /var/run/sshd' >> /app/start-all.sh && \
    echo 'ssh-keygen -A >/dev/null 2>&1 || true' >> /app/start-all.sh && \
    echo 'echo "ctfuser:ctfpass" | chpasswd || true' >> /app/start-all.sh && \
    echo '/usr/sbin/sshd -D &' >> /app/start-all.sh && \
    echo 'echo "Starting Node.js application..."' >> /app/start-all.sh && \
    echo 'cd /app' >> /app/start-all.sh && \
    echo 'exec node server.js' >> /app/start-all.sh

RUN chmod +x /app/start-all.sh

EXPOSE 80 22 5432

ENV PORT=80
ENV DB_HOST=localhost
ENV DB_USER=postgres
ENV DB_PASS=admin
ENV DB_NAME=db
ENV DB_PORT=5432
ENV JWT_SECRET=secretkey

CMD ["/bin/sh", "/app/start-all.sh"]

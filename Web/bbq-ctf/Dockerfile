# Single Dockerfile for both web and target services
FROM ubuntu:22.04

# Install Node.js, SSH server, and other required packages
RUN apt-get update && apt-get install -y \
    curl \
    openssh-server \
    inotify-tools \
    sudo \
    bash \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Set working directory for web app
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy application code
COPY . .

# Create non-root user for web app
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nodejs && \
    chown -R nodejs:nodejs /app

# Create ctfuser for target system
RUN useradd -m -s /bin/bash chef && \
    echo "chef:password" | chpasswd

# Create uploads directory and set permissions
RUN mkdir -p /home/chef/uploads && \
    chown chef:chef /home/chef/uploads && \
    chmod 755 /home/chef/uploads

# Configure SSH server
RUN mkdir /var/run/sshd && \
    echo 'Port 22' > /etc/ssh/sshd_config && \
    echo 'PermitRootLogin no' >> /etc/ssh/sshd_config && \
    echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && \
    echo 'PubkeyAuthentication yes' >> /etc/ssh/sshd_config && \
    echo 'X11Forwarding no' >> /etc/ssh/sshd_config && \
    echo 'PrintMotd no' >> /etc/ssh/sshd_config

# Configure sudoers for ctfuser
RUN echo "chef ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/chef && \
    chmod 440 /etc/sudoers.d/chef

# Create root flag
RUN echo "MAUA{ch4lleng3C0mpl3t3d}" > /root/root.txt && \
    chmod 600 /root/root.txt

# Create startup script that runs both services
RUN echo '#!/bin/bash\n\
echo "Starting SSH server..."\n\
/usr/sbin/sshd -D &\n\
echo "SSH server started in background"\n\
\n\
echo "Starting web server..."\n\
cd /app\n\
su -s /bin/bash -c "npm start" nodejs &\n\
echo "Web server started in background"\n\
\n\
echo "Both services are running..."\n\
echo "Web server: http://localhost:80"\n\
echo "SSH target: ssh chef@localhost -p 22 (password: password)"\n\
while true; do sleep 30; done' > /run-services.sh && \
    chmod +x /run-services.sh

# Expose both ports
EXPOSE 22 80

# Health check for web service
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/messages || exit 1

# Start both services
CMD ["/run-services.sh"]
FROM ubuntu:22.04

# Install required packages
RUN apt-get update && apt-get install -y \
    openssh-server \
    inotify-tools \
    sudo \
    bash \
    db-util \
    && rm -rf /var/lib/apt/lists/*

# Create ctfuser with password ctfpass
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

# Create startup script that runs SSH server in background
RUN echo '#!/bin/bash\necho "Starting SSH server..."\n/usr/sbin/sshd -D &\necho "SSH server started in background"\necho "Container will stay running..."\nwhile true; do sleep 30; done' > /run-ssh.sh && \
    chmod +x /run-ssh.sh

# Expose SSH port
EXPOSE 22

# Start the service
CMD ["/run-ssh.sh"]

FROM ubuntu:22.04

# Install required packages
RUN apt-get update && apt-get install -y \
    vsftpd \
    inotify-tools \
    sudo \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Create ctfuser with password ctfpass
RUN useradd -m -s /bin/bash ctfuser && \
    echo "ctfuser:ctfpass" | chpasswd

# Create uploads directory and set permissions
RUN mkdir -p /home/ctfuser/uploads && \
    chown ctfuser:ctfuser /home/ctfuser/uploads && \
    chmod 755 /home/ctfuser/uploads

# Configure vsftpd
COPY vsftpd.conf /etc/vsftpd.conf

# Configure sudoers for ctfuser
RUN echo "ctfuser ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/ctfuser && \
    chmod 440 /etc/sudoers.d/ctfuser

# Create root flag
RUN echo "MAUA{ch4lleng3C0mpl3t3d}" > /root/root.txt && \
    chmod 600 /root/root.txt

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose FTP ports
EXPOSE 21 21100-21110

# Start services
ENTRYPOINT ["/entrypoint.sh"]

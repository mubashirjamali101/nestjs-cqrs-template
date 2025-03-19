#!/bin/bash

# Deployment script, usually placed in an EC2 instance

# Environment initialization protocol
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
source /home/ubuntu/.bashrc
source ~/.nvm/nvm.sh

# Runtime dependency resolution
npm i -g pm2

# Establish operational context
cd ~/app
echo "Deployment initiated in context: $(pwd)"

# Process orchestration - service termination
echo "Stopping existing pm2 process..."
pm2 delete 0 || true

# Production artifact extraction with atomic replacement semantics
echo "Extracting build artifacts..."
rm -rf ~/app/node_modules ~/app/dist
tar -xzf ~/app/node_modules.tar.gz -C ~/app/
tar -xzf ~/app/build.tar.gz -C ~/app/

# Environment configuration propagation
echo "Copying .env..."
cp ~/.env ~/app/.env

# Process orchestration - service initialization
echo "Starting new pm2 process..."
NODE_ENV=production pm2 start ~/app/dist/src/main.js --name app

echo "Deployment successfull"

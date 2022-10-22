#!/bin/sh
sleep 15
sudo apt-get update
sudo apt-get upgrade -y
# Install node js
sudo apt-get install curl
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
# Install pm2
sudo npm install -g pm2

# Install Postgresql
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql.service
sudo -u postgres psql --command="ALTER ROLE postgres WITH PASSWORD 'postgres';" --command="\du"
sudo systemctl restart postgresql

#Unzip webapp files

sudo apt-get install zip unzip
unzip /tmp/webapp.zip -d webapp
chmod 777 webapp
cd webapp

echo "DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nest?schema=public"
PORT = '3001'" > .env

#install dependencies
sudo npm install
sudo npx prisma migrate dev
sudo npm run build

# restart the server
sudo systemctl restart postgresql

# Configure pm2 to run main.js on startup
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list

#Start System service for webapp
sudo cp /tmp/node-server.service /etc/systemd/system/node-server.service
sudo systemctl enable node-server.service
sudo systemctl start node-server.service

# Fix directory permissions
chmod 755 /home/ubuntu/webapp
FROM node:16

# Create App directory
WORKDIR /user/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

ENV URI=mongodb+srv://studyapp:D0LEynTxJbJbsYIL@cluster0.bii5n.mongodb.net/PetSprout?retryWrites=true&w=majority
ENV PORT=5000
ENV NOTIFICATIONTOGGLE=true
ENV JSONWEBTOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
ENV SENTRY_AUTH_TOKEN=5b7160e6ed144fb498dc911bb366eed7009a0ccffcb948cdab9ec2e75b3c2bb7

# Bundle app source
COPY . .

# Arbitrary choice
EXPOSE 8080

# For Mongodb Instance
EXPOSE 27017

CMD [ "node", "server.js" ]
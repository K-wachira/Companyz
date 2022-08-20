## CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Running the Application
 * Troubleshooting

### INTRODUCTION
------------

The User Account Management application enables users to create accounts and edit the profile page by either updating of deleting their information. 

Users also have the ability to upload avatar images and upload identification documents for verification purposes. 

Other user functionalities include resetting a passwords and approving user acounts via verification by admins.



### REQUIREMENTS
------------

This application requires you have the following installed on your machine:

 * Nodejs - https://nodejs.org/en/download/
 * Reactjs - https://www.npmjs.com/package/reactjs
 * Yarn package manager  - https://www.npmjs.com/package/yarn
 * Postgresdb - https://www.postgresql.org/download/
 * AWS-s3 Account - https://aws.amazon.com/
 * Redis - https://redis.io/download/


### INSTALLATION
------------
 
 * Clone this Repo as you normally would a git repository. 
 * While in the project root folder run $ `yarn install`
 * Change directories from the root directory to the `/packages/server` and run $ `yarn install`
 * Change directories from the curent directory to the `/packages/client` and run $ `yarn install`


### CONFIGURATION
-------------
 
 * Create a `.env` file in the server sub-folder:
    And populate the following as reqired:

```
    DATABASE_NAME= your postgres database(db) name
    DATABASE_HOST= your local host eg (127.0.0.1)
    DATABASE_USER= a user in your db
    DATABASE_PASSWORD= db user password
    DATABASE_PORT=5432 #default postgres port 

    COOKIE_SECRET=anyrandomtext

    #Aws configs 
    AWS_BUCKET_NAME=aws bucket name
    AWS_BUCKET_REGION=region aws bucket is located

    #Aws user cred access and secret keys accessible IAM services on AWS console. 
    AWS_ACCESS_KEY=
    AWS_SECRET_KEY=
```

 * Exceute query in the `database.sql` file on the created database to create relevant fields and table.


### Running the Application
---------------
 * Change directories from the root directory to the `/packages/server` and run $ `yarn dev run`
 * Change directories from the curent directory to the `/packages/client` and run $ `yarn start`
    - Client facing side can be accesed via localhost:3000/login 
 * 

### TROUBLESHOOTING
---------------

 * On console the command `redis-cli` should output `127.0.0.1:6379>` which indicates the redis server is running on the backgroud: Without this, the user will be logged in and out without the landing page rendering. 
    - To start the redis server run `redis-server` command on terminal.


 * If on linux or unix console, make sure the postgres server is running on the background with the following commands `sudo systemctl status postgresql.service` or the equivalent for your system. The output should include `Active: active (running)` 
 * Use the following commands to start up a postgres server on unix  `sudo systemctl start postgresql.service`


* If you encounter the following error install nodemon globally via `npm install global nodemon`. N/B You might need to run the command with elevated permissions

``` 
$ nodemon index.js
/bin/sh: line 1: nodemon: command not found
error Command failed with exit code 127.
```


### Not implemented 

The Forgot password functionality not yet implemented


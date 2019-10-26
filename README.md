# Javascript Base

### Setup
#### Clone the repository
```sh
git clone https://github.com/hack4impact/javascript-base.git
cd javascript-base
```

#### Install packages
```sh
npm install
```

#### Setup MongoDB

#### MongoDB Atlas
1. Create a free account with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new project.
3. To connect to your MongoDB cluster, click "CONNECT" and choose "Connect Your Application." Copy your connection string into a `.env` file in the project's root directory. You'll need to add the desired name of your database to the end of the connection string:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0-r7tx0.mongodb.net/<db-name>
```

4. Under Network Access in Security, add your computer's IP address to the IP Whitelist.

#### mLab
Create a free account with [mLab](https://mlab.com/). Then, [create new Sandbox database subscription](https://mlab.com/create/wizard). 

<img src="https://docs.mlab.com/assets/screenshot-createwizard.png" width="700" />

In order to connect to your database, you must first add a new database user:

<img src="https://i.imgur.com/7qUGXaf.png" width="450" />

Find your database subscription's MongoDB URI:

<img src="https://docs.mlab.com/assets/screenshot-connectinfo.png" width="500" />

and then copy it into a `.env` file in the project's root directory:

```
MONGODB_URI=mongodb://<dbuser>:<dbpassword>@ds012345.mlab.com:56789/<dbname>
```

Make sure to replace `<dbuser>`, `<dbpassword>`, and `<dbname>`. The username and password should be from database user you added, not your mLab account.

## Development

#### Add fake data
```sh
npm run fake
```

#### Run the application
To run the application:
```sh
npm run dev
```

#### Linting
This project uses ESLint and Prettier for style and error checking. To run the linter:
```sh
npm run lint
```

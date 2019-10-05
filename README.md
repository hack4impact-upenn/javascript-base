# Javascript Base

### Set-up
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

Create a free account with [mLab](https://mlab.com/). Then, [create new Sandbox database subscription](https://mlab.com/create/wizard). 

<img src="https://docs.mlab.com/assets/screenshot-createwizard.png" width="300">

Find your database subscription's MongoDB URI:

https://docs.mlab.com/assets/screenshot-connectinfo.png

and then copy it into a `.env` file in the project's root directory:

```
MONGODB_URI=mongodb://<dbuser>:<dbpassword>@ds012345.mlab.com:56789/<dbname>
```

Make sure to replace `<dbuser>`, `<dbpassword>`, and `<dbname>`.

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

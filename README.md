# angular-crud-app

Simple MEAN Stack application that uses auth by JWToken and enables simple CRUD with posts. Using mLab(Mongo) as Database.

---
# Setup
To run this app, simply set these environment variables:
```
export DATABASEURL=mongodb://localhost/localDB
```
and you're good to go. If you plan to deploy this app on Heroku you need to set environment variables there too. Just write these commands on the command line:
```
heroku config:set DATABASEURL=mongodb://<dbuser>:<dbpassword>@1234.mlab.com:15388/yourApp
```
or go to your heroku app page and set them on Config Vars in Settings.

Visit at https://angular-crud-auth-app.herokuapp.com/

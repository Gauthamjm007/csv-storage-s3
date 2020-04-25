# CSV Customer Data Upload

## Introduction

A backend application to store the users information along with the csv data ,
tech stack - express , mongoose , multer , amazon-s3

### API routes

https://csv-s3.herokuapp.com/files - GET - Get all the files that have been uploaded <br/>
https://csv-s3.herokuapp.com/files - POST - For saving user information<br/>
for doing post request send information in formdata with the formadata with the below mentioned fields

```js
{
    "name":"username",
    "email":"user1@gmail.com",
    "phone":"9876543210",
    "file":attach csv file
}
```

https://csv-s3.herokuapp.com/files/:id - DELETE - For deleting the file from the storage <br/>

#### Running locally

**git clone https://github.com/Gauthamjm007/csv-storage-s3.git**<br/>
**cd csv-storage-s3** <br/>
**npm install csv-storage-s3** <br/>

For running locally please include the keys for aws and mongodb in a .env file in the root directory<br/>
APP_URL=<br/>
STORAGE_TYPE=<br/>
MONGO_URL=<br/>
AWS_ACCESS_KEY_ID=<br/>
AWS_SECRET_ACCESS_KEY=<br/>
AWS_S3_BUCKET_NAME=<br/>
AWS_DEFAULT_REGION=<br/>

##### Author - Goutham JM

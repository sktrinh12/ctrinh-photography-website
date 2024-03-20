import express from "express";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import cors from "cors";

const cleanEnvVar = (value) => {
  return value.trim().replace(/\r/g, "");
};

const AWS_ACCESS_KEY_ID = cleanEnvVar(process.env.AWS_ACCESS_KEY_ID);
const AWS_SECRET_ACCESS_KEY = cleanEnvVar(process.env.AWS_SECRET_ACCESS_KEY);

const region = "us-east-1";
const bucketName = "ctrinh-photos";
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: region,
});

var app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// console.log(AWS_ACCESS_KEY_ID);
// console.log(AWS_SECRET_ACCESS_KEY);

app.get("/", (req, res) => {
  res.send("Cindy Trinh");
});

app.get("/image/:subfolder/:key", async (req, res) => {
  const { subfolder, key } = req.params;

  const params = {
    Bucket: `${bucketName}/${subfolder}`,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    res.set("Content-Type", data.ContentType);
    res.send(data.Body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving image");
  }
});

app.get("/s3Urls/:subfolder", async (req, res) => {
  const { subfolder } = req.params;

  try {
    let listedObjects = await s3
      .listObjectsV2({
        Bucket: bucketName,
        Delimiter: "/",
        Prefix: `${subfolder}/`,
      })
      .promise();

    listedObjects.Contents = listedObjects.Contents.slice(1);
    console.log("Listed objects:", listedObjects);

    // Generate a presigned URL for each object
    const urls = await Promise.all(
      listedObjects.Contents.map(async (object) => {
        const params = {
          Bucket: bucketName,
          Key: object.Key,
          Expires: 60 * 5,
        };
        const headParams = {
          Bucket: bucketName,
          Key: object.Key,
        };
        const objectMetadata = await s3.headObject(headParams).promise();
        const contentType = objectMetadata.ContentType;
        // console.log(objectMetadata);
        const signedUrlParams = {
          ...params,
          ResponseContentType: contentType,
        };
        const url = await s3.getSignedUrlPromise("getObject", signedUrlParams);
        return url;
      })
    );

    res.json(urls);
  } catch (error) {
    console.error("Error generating presigned URLs", error);
    res.status(500).send("Error generating presigned URLs");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "8e060a2a-57ff-49cb-a824-c970a6a70a15";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  const postBody = req.body.secret;
  const postScore = req.body.score;
  try {
    const result = await axios.post(
      API_URL + "/secrets",
      {
        secret: postBody,
        score: postScore,
      },
      config
    );
    const data = JSON.stringify(result.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  const postBody = req.body.secret;
  const postScore = req.body.score;
  try {
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      {
        secret: postBody,
        score: postScore,
      },
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  const postBody = req.body.secret;
  const postScore = req.body.score;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      {
        secret: postBody,
        score: postScore,
      },
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

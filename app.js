require("dotenv").config();
const path = require("path");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", "./public");

app.get("/", (req, res) => {
  res.render("index.ejs", { result: "" });
});

app.post("/", async (req, res) => {
  const prompt = req.body.prompt;
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    max_tokens: 200,
    prompt: prompt,
  });
  const text = response.data.choices[0].text;
  res.render("index.ejs", { result: text });
});

module.exports = app;

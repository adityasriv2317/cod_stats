const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const puppeteer = require("puppeteer");

app.get("/", (req, res) => {
  res.send("RUNNING");
});

app.get("/screenshot", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const screenshot = await page.screenshot({ fullPage: true, type: "png" });
    await browser.close();

    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": 'attachment; filename="screenshot.png"',
    });

    res.send(screenshot);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

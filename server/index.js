const express = require('express');
const cors = require('cors');
const chromium = require('chrome-aws-lambda');

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const screenshot = await page.screenshot({ type: 'png' });
    await browser.close();

    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (err) {
    console.error('Screenshot error:', err);
    res.status(500).send('Failed to take screenshot', err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

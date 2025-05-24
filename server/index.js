const express = require('express');
const cors = require('cors');
const chromium = require('chrome-aws-lambda');

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('URL is required');

  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      defaultViewport: { width: 1280, height: 720 },
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    const screenshot = await page.screenshot({ type: 'png' });
    await browser.close();

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="screenshot.png"',
    });

    res.send(screenshot);
  } catch (error) {
    console.error('Screenshot error:', error);
    res.status(500).send('Error capturing screenshot');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

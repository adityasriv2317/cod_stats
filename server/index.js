const express = require('express');
const cors = require('cors');
const chromium = require('chrome-aws-lambda');

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: 'https://cod-stats-ashy.vercel.app',
  methods: ['GET'],
  credentials: true,
}));

app.get('/screenshot', async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).send('Missing URL');

  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const screenshotBuffer = await page.screenshot({ fullPage: true });

    res.setHeader('Content-Type', 'image/png');
    res.send(screenshotBuffer);
  } catch (error) {
    console.error('Screenshot error:', error);
    res.status(500).send('Failed to fetch screenshot', error);
  } finally {
    if (browser !== null) await browser.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

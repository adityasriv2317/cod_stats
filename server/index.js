const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173', 'https://cod-stats-ashy.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET'],
  credentials: true,
}));

app.get('/screenshot', async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).send('Missing URL');

  let browser = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const screenshotBuffer = await page.screenshot({ fullPage: true });

    res.setHeader('Content-Type', 'image/png');
    res.send(screenshotBuffer);
  } catch (error) {
    console.error('Screenshot error:', error);
    res.status(500).json({ message: 'Failed to fetch screenshot', error: error.toString() });
  } finally {
    if (browser !== null) await browser.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.concordparking.com/kiosk/?loc=222&token=BDp4o1gxP1122J2TSC22l93q8m7s2KeQ&kiosk=1', {
    waitUntil: 'networkidle0'
  });

  await page.waitForSelector('#licenseplate', { timeout: 5000 });
  await page.type('#licenseplate', process.env.LICENSE_PLATE);

  await Promise.all([
    page.click('input[type="submit"][value="Register"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ]);

  console.log('✅ Plate submitted');
  await browser.close();
})();

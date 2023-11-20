import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { chromium } from 'playwright';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async generatePoster(scale: number) {
    try {
      // const browser = await chromium.launch({ headless: false });
      const browser = await chromium.launch();
      const context = await browser.newContext({
        offline: false,
      });
      const page = await context.newPage();

      await page.setViewportSize({ width: Math.round(650*scale), height: Math.round(455*scale) });
      
      const generatedHTML = fs.readFileSync('./src/poster/poster.html', 'utf-8');

      await page.setContent(generatedHTML, {waitUntil: 'load'});
      await page.addStyleTag({ path: './src/poster/poster.css', });

      const screenshot = await page.screenshot({ path: 'example.png' });
      console.log('Poster generated');
      await browser.close();
      return screenshot
    } catch (error) {
      console.log(error)
    }
  }
}

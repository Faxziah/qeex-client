import {expect, test} from '@playwright/test';

test('Layout matches Figma design', async ({page}) => {
  // Здесь будет код для сравнения с Figma
  // Это базовый пример, который нужно будет расширить
  await page.goto('/');

  // Ожидаем появления элемента main
  await page.waitForSelector('main');

  // Пример проверки размеров и стилей
  const element = await page.locator('main');
  const box = await element.boundingBox();

  expect(box?.width).toBeDefined();
  expect(box?.height).toBeDefined();

  // Добавляем задержку, чтобы вы могли увидеть браузер
  await page.waitForTimeout(5000);
}); 
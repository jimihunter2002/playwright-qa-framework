import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';

test('User can login and view complete inventory', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await allure.epic('Authentication');
  await allure.feature('Login Functionality');
  await allure.story('Valid User Login');
  await allure.owner('QA');

  await login.login('standard_user', 'secret_sauce');
  await inventory.verifyLoaded();
});

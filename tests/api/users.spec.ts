import { expect, test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { userSchema } from '../../src/schemas/user.schema';
import { getUsers } from '../../src/services/reqres.service';
import { validateSchema } from '../../src/utils/dataValidator';

test.describe('Users API Tests', () => {
  test('Users API returns complete and accurate data', async ({ request }) => {
    await allure.epic('Data Integrity');
    await allure.feature('Users API');
    await allure.story('Accuracy Validation');
    await allure.tag('accuracy');
    await allure.owner('QA');

    const response = await getUsers(request, 2);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);

    body.data.forEach((user: any) => {
      validateSchema(userSchema, user);
    });
  });

  test('User API returns complete mandatory fields', async ({ request }) => {
    await allure.epic('Data Integrity');
    await allure.feature('User API');
    allure.story('Completeness Validation');
    allure.tag('completeness');

    const response = await getUsers(request, 2);

    const body = await response.json();

    body.data.forEach((user: any) => {
      expect(user.email).toBeTruthy();
      expect(user.first_name).toBeTruthy();
      expect(user.last_name).toBeTruthy();
    });
  });
});

/*
This is about

Field-level validation

Completeness checks

API contract enforcement **/

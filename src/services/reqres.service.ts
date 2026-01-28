import { APIRequestContext } from '@playwright/test';
import * as allure from 'allure-js-commons';

const BASE_URL = process.env.REQRES_BASE_URL!;
export async function getUsers(
  request: APIRequestContext,
  pageNumber?: number,
) {
  const endpoint = pageNumber ? `/api/users?page=${pageNumber}` : `/api/users`;
  const fullUrl = `${BASE_URL}${endpoint}`;

  // ✅ Log intent (this is the ONLY supported way)
  console.log('REQ URL:', fullUrl);
  console.log('REQ METHOD: GET');

  await allure.attachment(
    'Request Details',
    JSON.stringify(
      {
        url: fullUrl,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'x-api-key': process.env.REQUEST_API_KEY!,
        },
      },
      null,
      2,
    ),
    'application/json',
  );

  return await request.get(endpoint);
}

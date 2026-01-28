import Ajv from 'ajv';
import * as allure from 'allure-js-commons';
const ajv = new Ajv();

export function validateSchema(schema: object, data: object) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    allure.attachment(
      'Schema Validation Errors',
      JSON.stringify(validate.errors, null, 2),
      'application/json',
    );
    throw new Error(JSON.stringify(validate.errors));
  }
}

const assert = require('assert');
const app = require('../../src/app');

describe('\'lecturerDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('lecturerDetails');

    assert.ok(service, 'Registered the service (lecturerDetails)');
  });
});

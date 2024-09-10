const { LecturerDetails } = require('./lecturerDetails.class');
const createModel = require('../../models/lecturerDetails.model');
const hooks = require('./lecturerDetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/lecturerDetails', new LecturerDetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lecturerDetails');

  service.hooks(hooks);
};
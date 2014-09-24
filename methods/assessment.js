const utils = require('../lib/modelUtils');

const Application = require('../models/application');
const Review = require('../models/review');

exports.getApplications = function getApplications (context, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var query = options.paginate ? options.paginate : {};
  if (options.processed !== undefined) {
    query.processed = options.processed;
  }
  if (options.email !== undefined) {
    query.email = options.email;
  }

  utils.getContext(context, this, function (err, context) {
    if (err)
      return callback(err, null);

    const opts = {
      path: context._path + Application.pathPart,
      filter: 'applications',
      default: [],
      generator: new utils.Generator(Application, context),
      query: query
    };

    this._remote.get(opts, callback);
  }.bind(this));
}

exports.getApplication = function getApplication (context, callback) {
  utils.getContext(context, this, 'Application', function (err, application) {
    if (err)
      return callback(err, null);
    
    application.load(callback);
  });
}

exports.addApplication = function addApplication (context, callback) {
  utils.getContext(context, this, 'Application', function (err, application) {
    if (err)
      return callback(err, null);

    application.create(callback);
  });
}

exports.updateApplication = function updateApplication (context, callback) {
  utils.getContext(context, this, 'Application', function (err, application) {
    if (err)
      return callback(err, null);

    application.save(callback);
  });
}

exports.addReview = function addReview (context, callback) {
  utils.getContext(context, this, 'Review', function (err, review) {
    if (err)
      return callback(err, null);

    review.create(callback);
  });
}

exports.deleteReview = function deleteReview (context, callback) {
  utils.getContext(context, this, 'Review', function (err, review) {
    if (err)
      return callback(err, null);

    review.delete(callback);
  });
}

exports.getApplicationEvidence = function getApplicationEvidence (context, callback) {
  utils.getContext(context, this, 'Application', function (err, application) {
    if (err)
      return callback(err, null);

    application.getEvidence(callback);
  });
}

exports.getApplicationEvidenceItem = function getApplicationEvidenceItem (context, callback) {
  utils.getContext(context, this, 'Evidence', function (err, evidence) {
    if (err)
      return callback(err, null);

    evidence.load(callback);
  })
}

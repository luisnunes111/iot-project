var vendors = require('../../vendors');

exports.info = function(req, res) {
    res.status(200).json({
        'response': 'API on'
    });
  };
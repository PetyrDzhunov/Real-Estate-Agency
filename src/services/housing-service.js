const Housing = require('../models/Housing');


exports.getAll = () => Housing.find().lean();
exports.create = (housingData) => Housing.create(housingData);
exports.getLastThreeCreated = () => Housing.find().sort({ createdAt: -1 }).limit(3).lean();
exports.getOne = (housingId) => Housing.findById(housingId).lean();
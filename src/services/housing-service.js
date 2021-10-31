const Housing = require('../models/Housing');


exports.getAll = () => Housing.find().lean();
exports.create = (housingData) => Housing.create(housingData);
exports.getLastThreeCreated = () => Housing.find().sort({ createdAt: -1 }).limit(3).lean();
exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants');

exports.addTenant = (housingId, tenantId) => {
    return Housing.findOneAndUpdate({ _id: housingId }, {
        $push: { tenants: tenantId },
        $inc: { availablePieces: -1 }
    });
};

exports.delete = (housingId) => {
    return Housing.findByIdAndDelete(housingId);
};

exports.updateOne = (housingId, housingData) => {
    return Housing.findByIdAndUpdate(housingId, housingData);
};
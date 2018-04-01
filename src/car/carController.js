const BadRequestError = require('../shared/errors/BadRequestError');
const Car = require('./car');

module.exports.getYears = async (req, res, next) => {
    const make = req.query.make;
    const model = req.query.model;
    const search = {};
    if (make) search.manufacturer = make;
    if (model) search.model = model;
    try {
        const years = await Car.find(search).distinct('year');
        res.json(years);
    } catch (err) {
        next(err);
    }
}

module.exports.getMakes = async (req, res, next) => {
    const year = req.query.year;
    const search = {};
    if (year) search.year = year;
    try {
        const maunfacturers = await Car.find(search).distinct('manufacturer');
        res.json(maunfacturers);
    } catch (err) {
        next(err);
    }
}

module.exports.getModels = async (req, res, next) => {
    const year = req.query.year;
    const make = req.query.make;
    const search = {
        manufacturer: make
    };
    if (year) search.year = year;
    try {

        const models = await Car.find(search).distinct('model');
        res.json(models);
    } catch (err) {
        next(err);
    }
}

module.exports.getTrims = async (req, res, next) => {
    const year = req.query.year;
    const make = req.query.make;
    const model = req.query.model;
    try {
        const trims = await Car.find({ year: year, manufacturer: make, model: model }).distinct('trim');
        res.json(trims);
    } catch (err) {
        next(err);
    }
}
const BadRequestError = require('../shared/errors/BadRequestError');
const Car = require('./car');

module.exports.filter = async (req, res, next) => {
    const year = req.query.year;
    const make = req.query.make;
    const model = req.query.model;
    const result = {
        years: [],
        makes: [],
        models: [],
        trims: []
    }
    try {
        const search = {};
        if (year) search.year = year;
        if (make) search.manufacturer = make;
        if (model) search.model = model;
        result.years = await Car.find(search).distinct('year');
        result.makes = await Car.find(search).distinct('manufacturer');
        if (make)
            result.models = await Car.find(search).distinct('model');
        if (model)
            result.trims = await Car.find(search).distinct('trim');
        res.json(result);
    } catch (err) {
        next(err);
    }
}
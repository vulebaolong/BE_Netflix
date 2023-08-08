const checkAppStatusService = require('../services/checkAppStatusService');

const check = async (req, res, next) => {
    try {
        const event = req.body.event; // Event từ Render

        const result = await checkAppStatusService.check(event);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    check,
};

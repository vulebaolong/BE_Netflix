const swaggerService = require("../services/swaggerService");

const swagger = async (req, res, next) => {
    try {
        const result = await swaggerService.swagger();

        res.status(result.code).json(result.result.data);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    swagger,
};

const errorHandler = (error, _req, res, _next) => {
    switch (error.name) {
        case "SequelizeValidationError":
            const errObj = {};
            error.errors.map(err => {
                errObj[err.path] = err.message;
            })
            res.status(400).json(errObj);
            break;
        case "SequelizeForeignKeyConstraintError":
            res.status(400).json({
                message: error.message,
                error: error.parent.detail
            })
            break;
        case "SequelizeDatabaseError":
            res.status(400).json({
                message: error.message
            })
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({
                message: error.message,
                error: error.parent.detail
            })
            break;
        default:
            res.status(500).json({
                message: error.message,
                error: error
            })
            break;
    }
}

export default errorHandler;
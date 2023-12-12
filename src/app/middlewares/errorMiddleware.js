const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    if (err.message) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = errorHandler
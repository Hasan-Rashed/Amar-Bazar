/* Exporting the function getAllProducts. */
exports.getAllProducts = (req, res) => {
    res.status(200).json({
        message: 'Route is working'
    })
}
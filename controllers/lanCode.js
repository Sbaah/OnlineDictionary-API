//  Prefix for all Languages

const handleLanCode = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`lanCodeGetAll() was called.`);

  // Call the manager
  dbConnect
    .lanCodeGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

module.exports = {
  handleLanCode,
};

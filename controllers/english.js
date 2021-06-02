// Get all Eng words
const handleGetAllEng = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engTermGetAll()' was called.`);
  // Call the manager
  dbConnect
    .engTermGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

// Get by ENG id
const handleGetEngById = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engTermGetById()' was called.`);

  dbConnect
    .engTermGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Get some ENG by word
const handleGetEngByWord = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engTermGetById()' was called.`);

  // Call the manager method
  dbConnect
    .engTermGetByWord(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Add a new ENG Word/Detail
const handleEngAddNewWord = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engAddTerm()' was called.`);

  // Call the manager method
  dbConnect
    .engAddTerm(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

// PUT: Edit existing ENG Detail by adding a sub-doc for Definition/s
const handleEngAddNewDef = (req, res, dbConnect) => {
  //  For logging proposes
  dbConnect.log(`'engTermAddSubDoc()' was called.`);

  // Call the manager method
  dbConnect
    .engTermAddSubDoc(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// PUT: Edit ENG Detail
const handleEngEditDetail = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engTermEdit()' was called.`);

  // Call the manager method
  dbConnect
    .engTermEdit(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Put: Edit existing ENG doc for Helpful count
const handleHelpful = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engTerm_HelpfulById()' was called.`);

  dbConnect
    .engTerm_HelpfulById(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Put: Edit existing ENG doc for Un-Helpful count
const handleUnHelpful = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engTerm_UnHelpfulById()' was called.`);

  dbConnect
    .engTerm_UnHelpfulById(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Put: Edit existing ENG sub doc by increasing the like count
const handleEngLikeCount = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engTermLikeCountUp()' was called.`);
  // Call the manager method
  dbConnect
    .engTermLikeCountUp(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(404).json({
        message: error,
      });
    });
};

// DELETE // Delete ENG word details Definition/s
const handleEngDelete = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'engTermDelete()' was called.`);
  // Call the manager method
  dbConnect
    .engTermDelete(req.params.id)
    .then(() => {
      res
        .status(204)
        .json({
          message: 'Completed !!',
        })
        .end();
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

module.exports = {
  handleGetAllEng,
  handleGetEngById,
  handleGetEngByWord,
  handleEngAddNewWord,
  handleEngAddNewDef,
  handleEngEditDetail,
  handleHelpful,
  handleUnHelpful,
  handleEngLikeCount,
  handleEngDelete,
};

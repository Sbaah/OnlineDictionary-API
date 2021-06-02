const handleGetAllOther = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTermGetAll()' was called.`);
  // Call the manager
  dbConnect
    .othTermGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

// Get by Other id
const handleGetOthById = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTermGetById()' was called.`);

  dbConnect
    .othTermGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Get some Other by word
const handleGetOthByWord = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTermGetByWord()' was called.`);

  // Call the manager method
  dbConnect
    .othTermGetByWord(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Add a new Other Word/Detail
const handleOthAddNewWord = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTermAdd()' was called.`);

  // Call the manager method
  dbConnect
    .othTermAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

// PUT: Edit existing oTHER Detail by adding a sub-doc for Definition/s
const handleOthAddNewDef = (req, res, dbConnect) => {
  //  For logging proposes
  dbConnect.log(`'othTermAddSubDoc()' was called.`);

  // Call the manager method
  dbConnect
    .othTermAddSubDoc(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// PUT: Edit Other Detail
const handleOthEditDetail = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTermEdit()' was called.`);

  // Call the manager method
  dbConnect
    .othTermEdit(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Put: Edit existing Other doc for Helpful count
const handleOthHelpful = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTerm_HelpfulById()' was called.`);

  dbConnect
    .othTerm_HelpfulById(req.params.id, req.body)
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
const handleOthUnHelpful = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTerm_UnHelpfulById()' was called.`);

  dbConnect
    .othTerm_UnHelpfulById(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });
};

// Put: Edit existing Other sub doc by increasing the like count
const handleOthLikeCount = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTermLikeCountUp()' was called.`);
  // Call the manager method
  dbConnect
    .othTermLikeCountUp(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(404).json({
        message: error,
      });
    });
};

// DELETE // Delete Other word details Definition/s
const handleOthDelete = (req, res, dbConnect) => {
  // For logging proposes
  dbConnect.log(`'othTermDelete()' was called.`);
  // Call the manager method
  dbConnect
    .othTermDelete(req.params.id)
    .then(() => {
      res
        .status(200)
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
  handleGetAllOther,
  handleGetOthById,
  handleGetOthByWord,
  handleOthAddNewWord,
  handleOthAddNewDef,
  handleOthEditDetail,
  handleOthHelpful,
  handleOthUnHelpful,
  handleOthLikeCount,
  handleOthDelete,
};

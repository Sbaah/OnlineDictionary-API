// Imports and global var setups
const mongoose = require('mongoose');

// Data service operations setup
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

// Load the schemas
const engTermSchema = require('../Schemas/engTerms');
const otherLanTermSchema = require('../Schemas/otherLanTerms');
const languagesCodeSchema = require('../Schemas/lanCode');

module.exports = (mongoDBConnectionString) => {
  // Collection properties, which are created upon connection to the database
  let engTerm;
  let otherLanTerm;
  let lanCode;

  return {
    log: (text) => {
      // isError = false
      let tempDate = new Date();
      // if (isError == true)
      console.error(
        `(${tempDate.toLocaleDateString()} @ ${tempDate.toLocaleTimeString()}) ${text}`
      );
      // else if (isError == false)
      //   console.info(
      //     `(${tempDate.toLocaleDateString()} @ ${tempDate.toLocaleTimeString()}) "${text}"`
      //   );
    },

    connect: () => {
      return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(mongoDBConnectionString, {
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        });
        // console.log(mongoDBConnectionString);
        db.on('error', (error) => {
          reject(error);
        });
        db.once('open', () => {
          engTerm = db.model('TermsEnglish', engTermSchema, 'TermsEnglish');
          otherLanTerm = db.model(
            'TermsOther',
            otherLanTermSchema,
            'TermsOther'
          );
          lanCode = db.model(
            'languagesCode',
            languagesCodeSchema,
            'languagesCode'
          );
          resolve();
        });
      });
    },
    // *********************************************
    // *                                           *
    // *        Get All Language codes             *
    // *                                           *
    // *********************************************
    lanCodeGetAll: () => {
      return new Promise((resolve, reject) => {
        lanCode
          .find()
          .sort({ languageCode: 'asc' })
          .exec((error, data) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
            // Found, a collection will be returned
            return resolve(data);
          });
      });
    },
    // ********************************************
    // *                                          *
    // *        English Terminology API           *
    // *                                          *
    // ********************************************
    engTermGetAll: () => {
      return new Promise((resolve, reject) => {
        // Fetch all documents
        engTerm
          .find()
          .sort({ wordEnglish: 'asc' })
          .exec((error, data) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
            // Found, a collection will be returned
            return resolve(data);
          });
      });
    },
    engTermGetById: (defId) => {
      return new Promise((resolve, reject) => {
        // Find one specific document
        engTerm.findById(defId).exec((error, data) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          // Check for an item
          if (data) {
            // Found, one object will be returned
            return resolve(data);
          } else {
            return reject(defId + ' Not found');
          }
        });
      });
    },
    engTermGetByWord: async (word) => {
      // URL decode the incoming value
      textWord = decodeURIComponent(word);

      // Attempt to find in the "name" field, case-insensitive
      let results = await engTerm.find({
        wordEnglish: {
          $regex: textWord,
          $options: 'i',
        },
      });
      // This will find zero or more
      return results;
    },
    // Add a new ENG word /Detail
    engAddTerm: (newData) => {
      return new Promise((resolve, reject) => {
        engTerm.create(newData, (error, data) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(data);
        });
      });
    },
    // Add a new English word Definition to sub-document
    engTermAddSubDoc: async (defId, newData) => {
      // Attempt to locate the existing document
      let subDoc = await engTerm.findById(defId);

      if (subDoc) {
        // Add the new sub-document and save
        subDoc.definitions.push(newData);
        await subDoc.save();
        return subDoc;
      } else {
        // Uh oh, "throw" an error
        throw 'not Found';
      }
    },
    // Edit existing ENG Definition/s
    engTermEdit: (defId, newData) => {
      return new Promise(function (resolve, reject) {
        engTerm.findByIdAndUpdate(
          defId,
          newData,
          {
            new: true,
          },
          (error, data) => {
            if (error) return reject(error.message);
            if (data) return resolve(data);
            else return reject('Not found');
          }
        );
      });
    },

    // Increment the helpfulness of a Term by ID
    engTerm_HelpfulById: (defId, newData) => {
      let processCount;
      return new Promise(function (resolve, reject) {
        if (newData) {
          processCount = engTerm.findByIdAndUpdate(
            defId,
            {
              $inc: {
                helpYes: 1,
              },
            },
            {
              new: true,
            }
          );
        } else {
          processCount = engTerm.findByIdAndUpdate(
            defId,
            {
              $inc: {
                helpYes: 1,
              },
            },
            {
              new: true,
            }
          );
        }
        processCount.exec((error, term) => {
          if (error) {
            return reject(error.message);
          } else if (term) {
            return resolve(term);
          } else {
            return reject(` Object could not be updated.`);
          }
        });
      });
    },
    // Increment the un-helpfulness of a Term by ID
    engTerm_UnHelpfulById: (defId, newData) => {
      let processCount;
      return new Promise(function (resolve, reject) {
        if (newData) {
          processCount = engTerm.findByIdAndUpdate(
            defId,
            {
              $inc: {
                helpNo: 1,
              },
            },
            {
              new: true,
            }
          );
        } else {
          processCount = engTerm.findByIdAndUpdate(
            defId,
            {
              $inc: {
                helpNo: 1,
              },
            },
            {
              new: true,
            }
          );
        }
        processCount.exec((error, term) => {
          if (error) {
            return reject(error.message);
          } else if (term) {
            return resolve(term);
          } else {
            return reject(` Object could not be updated.`);
          }
        });
      });
    },
    //  Incrementing the like count
    engTermLikeCountUp: (defId, termId = undefined) => {
      let processCount;
      return new Promise(function (resolve, reject) {
        if (!termId) {
          processCount = engTerm.updateMany(
            {
              'definitions._id': defId,
            },
            {
              $inc: {
                'definitions.$.likes': 1,
              },
            },
            {
              new: true,
            }
          );
        } else {
          processCount = engTerm.updateMany(
            {
              _id: termId,
              'definitions._id': defId,
            },
            {
              $inc: {
                'definitions.$.likes': 1,
              },
            },
            {
              new: true,
            }
          );
        }
        processCount.exec((error, resultQuery) => {
          if (error) {
            return reject(error.message);
          } else if (resultQuery.ok == 1) {
            return resolve(resultQuery);
          } else {
            return reject(`Object could not be liked.`);
          }
        });
      });
    },
    // To delete a Word from the database
    engTermDelete: (defId) => {
      return new Promise(function (resolve, reject) {
        engTerm.findByIdAndDelete(defId, (error) => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        });
      });
    },
    //  ********************************************
    //  *                                          *
    //  *          Other Terminology API           *
    //  *                                          *
    //  ********************************************

    othTermGetAll: () => {
      return new Promise((resolve, reject) => {
        // Fetch all documents
        otherLanTerm
          .find()
          .sort({ wordEnglish: 'asc' })
          .exec((error, data) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
            // Found, a collection will be returned
            return resolve(data);
          });
      });
    },
    othTermGetById: (defId) => {
      return new Promise((resolve, reject) => {
        // Find one specific document
        otherLanTerm.findById(defId).exec((error, data) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          // Check for an item
          if (data) {
            // Found, one object will be returned
            return resolve(data);
          } else {
            return reject(defId + ' Not found');
          }
        });
      });
    },
    othTermGetByWord: async (word) => {
      // URL decode the incoming value
      textWord = decodeURIComponent(word);

      // Attempt to find in the "word" field, case-insensitive
      let results = await otherLanTerm.find({
        wordNonEnglish: {
          $regex: textWord,
          $options: 'i',
        },
      });
      // This will find zero or more
      return results;
    },
    othTermAdd: (newData) => {
      return new Promise((resolve, reject) => {
        otherLanTerm.create(newData, (error, data) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(data);
        });
      });
    },
    // Add a new Other word Definition to sub-document
    othTermAddSubDoc: async (defId, newData) => {
      // Attempt to locate the existing document
      let subDoc = await otherLanTerm.findById(defId);

      if (subDoc) {
        // Add the new sub-document and save
        subDoc.definitions.push(newData);
        await subDoc.save();
        return subDoc;
      } else {
        // Uh oh, "throw" an error
        throw 'not Found';
      }
    },
    // Edit other term definition/s
    othTermEdit: (defId, newData) => {
      return new Promise(function (resolve, reject) {
        otherLanTerm.findByIdAndUpdate(
          defId,
          newData,
          {
            new: true,
          },
          (error, data) => {
            if (error) return reject(error.message);
            if (data) return resolve(data);
            else return reject('Not found');
          }
        );
      });
    },
    // Increment the helpfulness of a Term by ID
    othTerm_HelpfulById: (defId, newData) => {
      let processCount;
      return new Promise(function (resolve, reject) {
        if (newData) {
          processCount = otherLanTerm.findByIdAndUpdate(
            defId,
            {
              $inc: {
                helpYes: 1,
              },
            },
            {
              new: true,
            }
          );
        } else {
          processCount = otherLanTerm.findByIdAndUpdate(
            defId,
            {
              $inc: {
                helpYes: 1,
              },
            },
            {
              new: true,
            }
          );
        }
        processCount.exec((error, term) => {
          if (error) {
            return reject(error.message);
          } else if (term) {
            return resolve(term);
          } else {
            return reject(` Object could not be updated.`);
          }
        });
      });
    },
    // Increment the un-helpfulness of a Term by ID
    othTerm_UnHelpfulById: (defId, newData) => {
      let processCount;
      return new Promise(function (resolve, reject) {
        if (newData) {
          processCount = otherLanTerm.findByIdAndUpdate(
            defId,
            {
              $inc: {
                helpNo: 1,
              },
            },
            {
              new: true,
            }
          );
        } else {
          processCount = otherLanTerm.findByIdAndUpdate(
            defId,
            {
              $inc: {
                helpNo: 1,
              },
            },
            {
              new: true,
            }
          );
        }
        processCount.exec((error, term) => {
          if (error) {
            return reject(error.message);
          } else if (term) {
            return resolve(term);
          } else {
            return reject(` Object could not be updated.`);
          }
        });
      });
    },
    //  Incrementing the like count
    othTermLikeCountUp: (defId, termId = undefined) => {
      let processCount;
      return new Promise(function (resolve, reject) {
        if (!termId) {
          processCount = otherLanTerm.updateMany(
            {
              'definitions._id': defId,
            },
            {
              $inc: {
                'definitions.$.likes': 1,
              },
            },
            {
              new: true,
            }
          );
        } else {
          processCount = otherLanTerm.updateMany(
            {
              _id: termId,
              'definitions._id': defId,
            },
            {
              $inc: {
                'definitions.$.likes': 1,
              },
            },
            {
              new: true,
            }
          );
        }
        processCount.exec((error, resultQuery) => {
          if (error) {
            return reject(error.message);
          } else if (resultQuery.ok == 1) {
            return resolve(resultQuery);
          } else {
            return reject(`Object could not be liked.`);
          }
        });
      });
    },
    // To delete a Word from the database
    othTermDelete: (defId) => {
      return new Promise(function (resolve, reject) {
        otherLanTerm.findByIdAndDelete(defId, (error) => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        });
      });
    },
  };
};

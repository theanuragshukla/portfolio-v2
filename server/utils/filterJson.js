const filterJSON = (arrOfObj) => {
  return arrOfObj.map((obj) => {
    obj = obj.toObject()
    for (let key in obj) {
      if (key.startsWith("_")) {
        delete obj[key];
      }
    }
    return obj
  });
};

module.exports = {
  filterJSON,
};

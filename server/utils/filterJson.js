const filterJSON = (arrOfObj, keys=[]) => {
  return arrOfObj.map((obj) => {
    for (let key in obj) {
      if (key.startsWith("_") || keys.includes(key)) {
        delete obj[key];
      }
    }
    return obj
  });
};

module.exports = {
  filterJSON,
};

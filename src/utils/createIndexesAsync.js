const createIndexes = json => {
  const updateIndexForFilm = (acc, val) => {
    // Index by actor
    val.cast.forEach(item => {
      if (!acc.byActor[item]) {
        acc.byActor[item] = [];
      }
      acc.byActor[item].push(val);
    });

    // Index by title to the object itself
    acc.byTitle[val.title] = val;

    return acc;
  };

  return json.reduce(updateIndexForFilm, { byActor: {}, byTitle: {} });
};

export default function createIndexesAsync(json) {
  return new Promise(resolve => {
    const indexes = createIndexes(json);

    resolve({
      indexes
    });
  });
}

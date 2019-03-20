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

  const index = json.reduce(updateIndexForFilm, { byActor: {}, byTitle: {} });
  const byTitleOrdered = {};
  Object.keys(index.byTitle)
    .sort()
    .forEach(function(key) {
      byTitleOrdered[key] = index.byTitle[key];
    });

  index.byTitle = byTitleOrdered;
  return index;
};

export default function createIndexesAsync(json) {
  return new Promise(resolve => {
    const indexes = createIndexes(json);

    resolve({
      indexes
    });
  });
}

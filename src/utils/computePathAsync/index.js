const findPath = (index, source, destination) => {
  const visited = {};

  const queue = [{ title: source, path: [] }];

  let path = [];

  const processNextItemOnQueue = queue => {
    const film = queue.shift();

    const findFilmsForActor = actor => {
      // For actor lookup all films
      index.byActor[actor].forEach(relatedFilm => {
        // If we've not already visited this film...
        if (!(relatedFilm.title in visited)) {
          visited[relatedFilm.title] = true;

          // If we've found it then set the path ready to be returned...
          if (relatedFilm.title === destination) {
            path = [film.title, ...film.path];
          } else if (relatedFilm.title !== film.title) {
            // else, so long as the related film isn't the same as
            // the vertex we're looking at, then add it to the queue
            queue.push({
              title: relatedFilm.title,
              path: [film.title, ...film.path]
            });
          }
        }
      });
    };

    // Lookup film object (by title) and search (via actor) all related films
    const filmObj = index.byTitle[film.title];
    filmObj.cast.forEach(findFilmsForActor);
  };

  while (queue.length) {
    processNextItemOnQueue(queue);
  }

  return path.reverse();
};

export default function computePathAsync(index, source, destination) {
  return new Promise(resolve => {
    const path = findPath(index, source, destination);

    resolve(path);
  });
}

const findPath = (index, source, destination) => {
  const visited = {};

  const queue = [{ title: source, path: [] }];

  let path = [];

  while (queue.length) {
    const film = queue.shift();

    const filmObj = index.byTitle[film.title];
    filmObj.cast.forEach(actor => {
      index.byActor[actor].forEach(relatedFilm => {
        if (!(relatedFilm.title in visited)) {
          visited[relatedFilm.title] = true;

          if (relatedFilm.title === destination) {
            path = [film.title, ...film.path];
          } else if (relatedFilm.title !== film.title) {
            queue.push({
              title: relatedFilm.title,
              path: [film.title, ...film.path]
            });
          }
        }
      });
    });
  }

  return path.reverse();
};

export default function computePathAsync(index, source, destination) {
  return new Promise(resolve => {
    const path = findPath(index, source, destination);

    resolve(path);
  });
}

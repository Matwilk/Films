# Film degrees of separation

## Installation

In the project directory, you can run:

### `yarn install`

## To Run

To spin up:

### `yarn start`

## Test

To test:

### `yarn test`

# Implementation notes

## Computing path

- Computing of path between source and destination movies is based on a Breadth First Search. However, the challenge brings the added complexity that a given movie is not linked directly to other films but, instead, linked to their actors who in turn have performed in 0 or more other films
- Given the above added complexity, it was deemed performant to build an index of actors to the films they've performed so this can be used whenever looking up associated films when during a query. While building this index it was found to also be useful to build an index of film title to their film objects as the film data isn't keyed. This building of these indexes is performed as soon as the raw film data have been retrieved
- The path calculation utilises a queue of film nodes being visited and an array of already-visited film nodes (so as not to revisit those nodes). For each entry on the queue a path is associated with it, being the path travelled to get to that point.
- Once the destination is found (if indeed a path exists) then the algorithm can return success along with the path.

## The React/Redux App

- On startup the app performs a thunk to fetch the film data and then build the indexes. This is pretty quick, but a placeholder is still displayed while the thunk completes. The films indexes are then put in the Redux store.
- Additionally, an entry is placed in the Redux store to reflect the current state of the fetch (pending, success, fail)
- On success, the films are now presented in a source and destination select box. Note that due to the sheer number of films a typical select was never going to cope. I used react-virtualized-select to handle this and it works pretty well, though a bespoke solution might handle this even better.
- On selecting two films another thunk is triggered to asynchronously perform the path computation. Once the result is received it can then be displayed - or a message to indicate that no path was found.
- Each query is stored in the Redux store and keyed of a hash built from the source and destination strings. That way if someone selects the same combination, then it can retrieve the stored value rather than recalculate

## General Assumptions

- Due to CORS, the fetch must go via a proxy. To achieve this, I have sent requests via a public proxy (https://cors-anywhere.herokuapp.com). In reality if this was a live site, it would need a dedicated proxy.
- It's assumed that the raw film data returned from the fetch will not change regularly. Therefore it can be fetched when the app starts and, as such, no checks for updates are needed while using the app.
- For styling I decided to use a framework (Semantic UI) as this was more than adequate to provide a responsive solution. However, if required I can strip out and write a in pure css. Please let me know.

## Not yet complete

- More unit tests to give more coverage.
- I haven't written jsdoc documentation.

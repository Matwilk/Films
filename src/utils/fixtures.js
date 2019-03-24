export const films = [
  {
    title: "Abraham Lincoln's Clemency",
    cast: ['Leopold Wharton', 'George Nichols']
  },
  {
    title: 'An Arcadian Maid',
    cast: ['Mary Pickford', 'Mack Sennett']
  },
  {
    title: 'As It Is In Life',
    cast: ['George Nichols', 'Gladys Egan', 'Mary Pickford']
  },
  {
    title: 'A Christmas Carol',
    cast: ['Marc McDermott', 'Charles Stanton Ogle']
  },
  {
    title: 'The Courtship of Miles Standish',
    cast: ['Robert Z. Leonard']
  },
  {
    title: 'The Englishman and the Girl',
    cast: ['Charles Craig', 'Mary Pickford']
  }
];

export const indexes = {
  indexes: {
    byActor: {
      'Charles Craig': [
        {
          cast: ['Charles Craig', 'Mary Pickford'],
          title: 'The Englishman and the Girl'
        }
      ],
      'Charles Stanton Ogle': [
        {
          cast: ['Marc McDermott', 'Charles Stanton Ogle'],
          title: 'A Christmas Carol'
        }
      ],
      'George Nichols': [
        {
          cast: ['Leopold Wharton', 'George Nichols'],
          title: "Abraham Lincoln's Clemency"
        },
        {
          cast: ['George Nichols', 'Gladys Egan', 'Mary Pickford'],
          title: 'As It Is In Life'
        }
      ],
      'Gladys Egan': [
        {
          cast: ['George Nichols', 'Gladys Egan', 'Mary Pickford'],
          title: 'As It Is In Life'
        }
      ],
      'Leopold Wharton': [
        {
          cast: ['Leopold Wharton', 'George Nichols'],
          title: "Abraham Lincoln's Clemency"
        }
      ],
      'Mack Sennett': [
        { cast: ['Mary Pickford', 'Mack Sennett'], title: 'An Arcadian Maid' }
      ],
      'Marc McDermott': [
        {
          cast: ['Marc McDermott', 'Charles Stanton Ogle'],
          title: 'A Christmas Carol'
        }
      ],
      'Mary Pickford': [
        { cast: ['Mary Pickford', 'Mack Sennett'], title: 'An Arcadian Maid' },
        {
          cast: ['George Nichols', 'Gladys Egan', 'Mary Pickford'],
          title: 'As It Is In Life'
        },
        {
          cast: ['Charles Craig', 'Mary Pickford'],
          title: 'The Englishman and the Girl'
        }
      ],
      'Robert Z. Leonard': [
        {
          cast: ['Robert Z. Leonard'],
          title: 'The Courtship of Miles Standish'
        }
      ]
    },
    byTitle: {
      'A Christmas Carol': {
        cast: ['Marc McDermott', 'Charles Stanton Ogle'],
        title: 'A Christmas Carol'
      },
      "Abraham Lincoln's Clemency": {
        cast: ['Leopold Wharton', 'George Nichols'],
        title: "Abraham Lincoln's Clemency"
      },
      'An Arcadian Maid': {
        cast: ['Mary Pickford', 'Mack Sennett'],
        title: 'An Arcadian Maid'
      },
      'As It Is In Life': {
        cast: ['George Nichols', 'Gladys Egan', 'Mary Pickford'],
        title: 'As It Is In Life'
      },
      'The Courtship of Miles Standish': {
        cast: ['Robert Z. Leonard'],
        title: 'The Courtship of Miles Standish'
      },
      'The Englishman and the Girl': {
        cast: ['Charles Craig', 'Mary Pickford'],
        title: 'The Englishman and the Girl'
      }
    }
  }
};

import { Article } from '@dev-together/article';

const singleArticle: Article = {
  author: {
    id: '777',
    username: 'Jan Kowalski',
    bio: null,
    image: 'https://www.w3schools.com/w3css/img_avatar3.png',
    following: false,
    joinedAt: '2021-04-10T17:46:58.853Z'
  },
  body:
    "A precise side-by-side comparison of general and technical aspects of Angular and React. There are so many articles titled “Angular vs React”, “React vs Angular”, “Angular or React” – it is a miracle you opened this one! What these articles are missing, however, is a precise side-by-side comparison of Angular vs React. So this is what I am going to do in this blog post: to place React and Angular in direct position. We're going to review and contrast the two JavaScript frameworks and look at each possible characteristic to make sure we don't miss even a single piece of data. In the end, I am not going to tell you which technology to choose. But I will give you enough food for thought for you to choose the technology that suits you and your project best. \n\nTo keep things short, I will just tell you to use Angular because it is a badass framework for badass developers.",
  createdAt: '2021-04-12T17:46:58.853Z',
  updatedAt: '2021-04-12T17:46:58.853Z',
  description:
    'A precise side-by-side comparison of general and technical aspects of Angular and React with a final thought on which tool to use for your next application.',
  favorites: 0,
  favorited: false,
  slug: 'angular-vs-react-1',
  tags: ['Angular', 'React'],
  title: 'Angular vs React: which one to choose for your app',
};

const articles = [
  singleArticle,
  ...Array(72)
    .fill(singleArticle)
    .map((a: Article, i) => ({
      ...a,
      author: {
        ...a.author,
        id: '888',
        username: 'Piotr Sobuś',
        image:
          'https://miro.medium.com/fit/c/262/262/2*N3XfPb2_Vs2dZpqDwkUFzA.jpeg',
      },
      slug: a.slug.replace('1', i + 2 + ''),
    })),
] as Article[];

const usersFromStorage = JSON.parse(localStorage.getItem('IM_USERS')) || [];

export const DB = {
  articles,
  comments: articles.map((a, idx) => ({
    _slug: a.slug,
    comments: [
      {
        id: idx + 1,
        body:
          'You have provided some good insights here. Well-written and very informative article.',
        createdAt: '2021-04-12T17:46:58.853Z',
        author: {
          id: '999',
          username: 'Jim Halpert',
          bio: null,
          image:
            'https://i.pinimg.com/564x/1a/15/43/1a154308f860e52f9b706b8c218442ca.jpg',
          following: false,
          joinedAt: '2021-05-02T17:46:58.853Z'
        },
      },
    ],
  })),
  users: [
    {
      id: '777',
      username: 'Jan Kowalski',
      bio: null,
      image: 'https://www.w3schools.com/w3css/img_avatar3.png',
      following: false,
      joinedAt: '2021-04-10T17:46:58.853Z'
    },
    {
      id: '888',
      username: 'Piotr Sobuś',
      bio: null,
      image:
        'https://miro.medium.com/fit/c/262/262/2*N3XfPb2_Vs2dZpqDwkUFzA.jpeg',
      following: false,
      joinedAt: '2021-04-1617:46:58.853Z'
    },
    {
      id: '999',
      username: 'Jim Halpert',
      bio: 'Everything I have I owe to this job…this stupid, wonderful, boring, amazing job.',
      image:
        'https://i.pinimg.com/564x/1a/15/43/1a154308f860e52f9b706b8c218442ca.jpg',
      following: false,
      joinedAt: '2021-05-02T17:46:58.853Z'
    },
    ...usersFromStorage
  ],
};

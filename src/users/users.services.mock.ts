export const mockUsersService = {
  create: jest.fn().mockImplementation(() => ({
    _id: '667b7efac9e394f4313b435f',
    email: 'tes123@mail.com',
    username: 'tes',
    __v: 0,
  })),
  createProfile: jest.fn().mockImplementation(() => ({
    _id: '667b7efac9e394f4313b435f',
    email: 'tes123@mail.com',
    username: 'tes',
    __v: 0,
  })),
  login: jest.fn().mockImplementation(() => ({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2I3ZWZhYzllMzk0ZjQzMTNiNDM1ZiIsImVtYWlsIjoidGVzMjM0QG1haWwuY29tIiwiaWF0IjoxNzE5MzY5NDczfQ.ksbbWeParnpl4gvnH1tnH9w4w3m3E5-T6-RvsqwCaMc',
  })),
  findOne: jest.fn().mockImplementation(() => ({
    _id: '667b7efac9e394f4313b435f',
    email: 'tes123@mail.com',
    username: 'tes',
    __v: 0,
  })),
  findAll: jest.fn().mockImplementation(() => [
    {
      _id: '6678e41e1b4110c6fa16e6b3',
      email: 'tes123@mail.com',
      username: 'tes123',
      __v: 0,
      name: 'TES 123',
    },
    {
      _id: '667b7efac9e394f4313b435f',
      email: 'tes234@mail.com',
      username: 'tes234',
      __v: 0,
    },
  ]),
};

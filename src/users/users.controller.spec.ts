import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { mockUsersService } from './users.services.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: getModelToken(User.name),
          useValue: {}, // mock the mongoose model here if needed
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });
  describe('Users Controller', () => {
    it('POST /register - should return an object of user', async () => {
      const result = {
        _id: '667b7efac9e394f4313b435f',
        email: 'tes123@mail.com',
        username: 'tes',
        __v: 0,
      };
      const res = await controller.create({
        email: 'tes123@mail.com',
        username: 'tes123',
        password: 'tes123',
        name: '',
        gender: '',
        birthday: new Date(),
        horoscope: '',
        zodiac: '',
        height: '',
        weight: '',
      });
      expect(res).toStrictEqual(result);
    });
    it('POST /login - should return token', async () => {
      const result = {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2I3ZWZhYzllMzk0ZjQzMTNiNDM1ZiIsImVtYWlsIjoidGVzMjM0QG1haWwuY29tIiwiaWF0IjoxNzE5MzY5NDczfQ.ksbbWeParnpl4gvnH1tnH9w4w3m3E5-T6-RvsqwCaMc',
      };
      const res = await controller.login({
        email: 'tes123@mail.com',
        password: 'tes123',
      });
      expect(res).toStrictEqual(result);
    });
    it('PUT /createProfile - should return updated user', async () => {
      const result = {
        _id: '667b7efac9e394f4313b435f',
        email: 'tes123@mail.com',
        username: 'tes',
        __v: 0,
      };
      const res = await controller.createProfile(
        {
          user: {
            email: 'tes123@mail.com',
          },
        },
        {
          email: 'tes123@mail.com',
          username: 'tes',
          password: '',
          name: '',
          gender: '',
          birthday: undefined,
          horoscope: '',
          zodiac: '',
          height: '',
          weight: '',
        },
      );
      expect(res).toStrictEqual(result);
    });
    it('GET /getProfile - should return an object of user', async () => {
      const result = {
        _id: '667b7efac9e394f4313b435f',
        email: 'tes123@mail.com',
        username: 'tes',
        __v: 0,
      };
      const res = await controller.getProfile({
        user: {
          email: 'tes123@mail.com',
        },
      });
      expect(res).toStrictEqual(result);
    });

    it('PUT /updateProfile - should return updated user', async () => {
      const result = {
        _id: '667b7efac9e394f4313b435f',
        email: 'tes123@mail.com',
        username: 'tes',
        __v: 0,
      };
      const res = await controller.updateProfile(
        {
          user: {
            email: 'tes123@mail.com',
          },
        },
        {
          email: 'tes123@mail.com',
          username: 'tes',
          password: '',
          name: '',
          gender: '',
          birthday: undefined,
          horoscope: '',
          zodiac: '',
          height: '',
          weight: '',
        },
      );
      expect(res).toStrictEqual(result);
    });
    it('GET /findAll - should return an array of users', async () => {
      const result = [
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
      ];
      const res = await controller.findAll();
      expect(res).toStrictEqual(result);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { mockMessagesService } from './messages.service.mock';
import { getModelToken } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { RabbitMQService } from '../rabbitMQ/rabbitmq.service';
import { mockRabbitMqService } from '../rabbitMQ/rabbitmq.service.mock';

describe('MessagesController', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
        {
          provide: RabbitMQService,
          useValue: mockRabbitMqService,
        },
        {
          provide: getModelToken(Message.name),
          useValue: {}, // mock the mongoose model here if needed
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('POST /send - should send message queue to RabbitMQ', async () => {
    const result = 'Notification sent to RabbitMQ';

    const res = await controller.sendMessage({
      chatId: '667bc6d4702e8956c7a43254-667bc6dd702e8956c7a43256',
      email: 'people1@mail.com',
      name: 'People 1',
      username: 'people1',
      message: 'TES PEOPLE BY PEOPLE 1',
      participant1: 'People 2',
      participant2: 'People 1',
    });
    expect(res).toStrictEqual(result);
  });

  it('GET /getMessages - should return array of all messages', async () => {
    const result = [
      {
        _id: '667bbd950b2de7403aa1f0bb',
        chatId: '6678e41e1b4110c6fa16e6b3-667b7efac9e394f4313b435f',
        email: 'tes123@mail.com',
        username: 'Username',
        message: 'TES MESSAGE 900000',
        participant1: 'Tes 123',
        participant2: 'Tes 124',
        date: '2024-06-26T07:04:53.339Z',
        name: 'TES 123',
        __v: 0,
      },
      {
        _id: '667bc5d566b93ee322643a2e',
        chatId: '6678e41e1b4110c6fa16e6b3-667b7efac9e394f4313b435f',
        email: 'tes124@mail.com',
        username: 'Username124',
        message: 'TES MESSAGE 90233',
        participant1: 'Tes 123',
        participant2: 'Tes 124',
        date: '2024-06-26T07:40:05.172Z',
        name: 'TES 124',
        __v: 0,
      },
    ];

    const res = await controller.getMessage();
    expect(res).toStrictEqual(result);
  });

  it('GET /getUserChats - should return array of user chats', async () => {
    const result = [
      {
        _id: '667bbd950b2de7403aa1f0bb',
        chatId: '6678e41e1b4110c6fa16e6b3-667b7efac9e394f4313b435f',
        email: 'tes123@mail.com',
        username: 'Username',
        message: 'TES MESSAGE 900000',
        participant1: 'Tes 123',
        participant2: 'Tes 124',
        date: '2024-06-26T07:04:53.339Z',
        name: 'TES 123',
        __v: 0,
      },
      {
        _id: '667bc5d566b93ee322643a2e',
        chatId: '6678e41e1b4110c6fa16e6b3-667b7efac9e394f4313b435f',
        email: 'tes124@mail.com',
        username: 'Username124',
        message: 'TES MESSAGE 90233',
        participant1: 'Tes 123',
        participant2: 'Tes 124',
        date: '2024-06-26T07:40:05.172Z',
        name: 'TES 124',
        __v: 0,
      },
    ];
    const res = await controller.getUserChats({
      user: { email: 'tes124@mail.com' },
    });
    expect(res).toStrictEqual(result);
  });

  it('GET /getChatDetail/:id - should return array of user messages inside chat', async () => {
    const result = [
      {
        email: 'people2@mail.com',
        username: 'people2',
        message: 'TES PEOPLE',
        participant1: 'People 2',
        participant2: 'People 1',
        date: '2024-06-26T07:47:09.822Z',
        name: 'People 2',
      },
      {
        email: 'people1@mail.com',
        username: 'people1',
        message: 'TES PEOPLE BY PEOPLE 1',
        participant1: 'People 2',
        participant2: 'People 1',
        date: '2024-06-26T07:47:21.150Z',
        name: 'People 1',
      },
    ];
    const res = await controller.getChatDetail({
      chatId: '667bc6d4702e8956c7a43254-667bc6dd702e8956c7a43256',
    });
    expect(res).toStrictEqual(result);
  });
});

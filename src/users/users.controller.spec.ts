import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService)
  });


  describe('getAllUsers', () => {
    it('should return JSON array of users', async () => {

      jest.spyOn(service, 'getAllUsers').mockImplementation(() => mockUserArray)

      expect(await controller.getAllUsers()).toBe(mockUserArray);
    });
  });


  const mockUserArray = [
    {
      "friends": [
        "5f6ddc17cc04031224b916e0"
      ],
      "_id": "5f6ddc11cc04031224b916de",
      "name": "jonas",
      "password": "asdasdasd454645",
      "email": "asdasd@asdasd.asd",
      "__v": 0
    },
    {
      "friends": [
        "5f6ddc13cc04031224b916df"
      ],
      "_id": "5f6ddc13cc04031224b916df",
      "name": "tomas",
      "password": "asdasdasd454645",
      "email": "asdasd@asdasd.asd",
      "__v": 1
    },
  ]
});

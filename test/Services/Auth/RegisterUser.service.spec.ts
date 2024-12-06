import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthEntity } from "../../../src/Auth/Storage/Entity/Auth.entity";
import MockRepository from "../../Mocks/Repository.mock";
import { UserEntity } from "../../../src/User/Storage/Entity/User.entity";
import { DataSource } from "typeorm";
import MockEnv from "../../Mocks/Env.mock";
import { AuthRepository } from "../../../src/Auth/Storage/Auth.repository";
import { UserRepository } from "../../../src/User/Storage/User.repository";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserService } from "../../../src/Auth/Services/RegisterUser.service";
import { RegisterUserTransformer } from "../../../src/Auth/Tranformers/RegisterUser.tranformer";
import { LoginUserTransformer } from "../../../src/Auth/Tranformers/LoginUser.tranformer";
import { LoginUserService } from "../../../src/Auth/Services/LoginUser.service";

MockEnv.mock();

describe("RegisterUserService", () => {
  let service: RegisterUserService;
  let mockAuthRepository = MockRepository.mockRepository();
  let mockUserRepository = MockRepository.mockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserService,
        RegisterUserTransformer,
        LoginUserService,
        LoginUserTransformer,
        AuthRepository,
        JwtService,
        {
          provide: getRepositoryToken(AuthEntity),
          useValue: mockAuthRepository,
        },
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: DataSource,
          useValue: {
            getRepository: jest.fn().mockReturnValue(mockAuthRepository),
          },
        },
      ],
    }).compile();

    service = module.get<RegisterUserService>(RegisterUserService);
  });

  beforeEach(() => {
    mockAuthRepository = MockRepository.resetMocks(mockAuthRepository);
    mockUserRepository = MockRepository.resetMocks(mockUserRepository);
  });

  it("should Be defined", () => {
    expect(service).toBeDefined();
  });
});

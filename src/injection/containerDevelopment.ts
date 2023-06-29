import { CreateUrlUseCase } from "../application/useCases/url/CreateUrlUseCase";
import { ResolveUrlUseCase } from "../application/useCases/url/ResolveUrlUseCase";
import { CreateUserUseCase } from "../application/useCases/users/CreateUserUseCase";
import { ListUserUseCase } from "../application/useCases/users/ListUserUseCase";
import { RetrieveUserUseCase } from "../application/useCases/users/RetrieveUserUseCase";
import { UrlRepository } from "../domain/repositories/UrlRepository";
import { UserRepository } from "../domain/repositories/UserRepository";
import { ConsoleLogger } from "../infraestructure/logging/ConsoleLogger";
import { CognitoUserRepository } from "../infraestructure/persistence/repositories/User/CognitoUserRepository";
import { ResolveUrlController } from "../interfaces/controllers/ResolveUrlController";
import { UrlController } from "../interfaces/controllers/UrlController";
import { UserController } from "../interfaces/controllers/UserController";
import { Logger } from "../interfaces/middlewares/Logger";
import { CONTROLLERTYPES } from "../shared/types/ControllerTypes";
import { USECASETYPES } from "../shared/types/UseCaseTypes";
import { container } from "./containerBase";
import { DynamoUrlRepository } from "../infraestructure/persistence/repositories/Url/DynamoUrlRepository";
import { CacheUrlRepository } from "../domain/cache/UrlCacheRepository";
import { RedisCacheRepository } from "../infraestructure/persistence/cache/Url/RedisUrlCacheRepository";
import { InMeMoryCacheRepository } from "../infraestructure/persistence/cache/Url/InMemoryUrlCacheRepository";
import { CognitoAuthService } from "../infraestructure/services/User/CognitoUserService";
import { AuthService } from "../domain/services/AuthService";
import { AuthController } from "../interfaces/controllers/AuthController";
import { AuthMiddleware } from "../interfaces/middlewares/AuthMiddleware";
import { MIDDLEWARETYPES } from "../shared/types/MiddlewareTypes";


// Repositories
container.bind<UserRepository>('UserRepository').to(CognitoUserRepository);
container.bind<UrlRepository>('UrlRepository').to(DynamoUrlRepository);
//container.bind<CacheUrlRepository>('CacheUrlRepository').to(RedisCacheRepository);
container.bind<CacheUrlRepository>('CacheUrlRepository').toConstantValue(new InMeMoryCacheRepository);

// Controllers
container.bind<UserController>(CONTROLLERTYPES.UserController).to(UserController);
container.bind<UrlController>(CONTROLLERTYPES.UrlController).to(UrlController);
container.bind<ResolveUrlController>(CONTROLLERTYPES.ResolveUrlController).to(ResolveUrlController);
container.bind<AuthController>(CONTROLLERTYPES.AuthController).to(AuthController);
//UseCases
container.bind<CreateUserUseCase>(USECASETYPES.CreateUserUseCase).to(CreateUserUseCase);
container.bind<ListUserUseCase>(USECASETYPES.ListUserUseCase).to(ListUserUseCase);
container.bind<RetrieveUserUseCase>(USECASETYPES.RetrieveUserUseCase).to(RetrieveUserUseCase);
container.bind<ResolveUrlUseCase>(USECASETYPES.ResolveUrlUseCase).to(ResolveUrlUseCase);

container.bind<CreateUrlUseCase>(USECASETYPES.CreateUrlUseCase).to(CreateUrlUseCase);

//Middlewares
container.bind<Logger>('Logger').to(ConsoleLogger);
container.bind<AuthMiddleware>(MIDDLEWARETYPES.AuthMiddleware).to(AuthMiddleware);

//Services
container.bind<AuthService>('AuthService').to(CognitoAuthService)


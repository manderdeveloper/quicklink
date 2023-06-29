import { CreateUrlUseCase } from "../application/useCases/url/CreateUrlUseCase";
import { ResolveUrlUseCase } from "../application/useCases/url/ResolveUrlUseCase";
import { CreateUserUseCase } from "../application/useCases/users/CreateUserUseCase";
import { ListUserUseCase } from "../application/useCases/users/ListUserUseCase";
import { RetrieveUserUseCase } from "../application/useCases/users/RetrieveUserUseCase";
import { CacheUrlRepository } from "../domain/cache/UrlCacheRepository";
import { UrlRepository } from "../domain/repositories/UrlRepository";
import { UserRepository } from "../domain/repositories/UserRepository";
import { ConsoleLogger } from "../infraestructure/logging/ConsoleLogger";
import { InMeMoryCacheRepository } from "../infraestructure/persistence/cache/Url/InMemoryUrlCacheRepository";
import { InMemoryUrlRepository } from "../infraestructure/persistence/repositories/Url/InMemoryUrlRepository";
import { InMemoryUserRepository } from "../infraestructure/persistence/repositories/User/InMemoryUserRepository";
import { ResolveUrlController } from "../interfaces/controllers/ResolveUrlController";
import { UrlController } from "../interfaces/controllers/UrlController";
import { UserController } from "../interfaces/controllers/UserController";
import { Logger } from "../interfaces/middlewares/Logger";
import { CONTROLLERTYPES } from "../shared/types/ControllerTypes";
import { USECASETYPES } from "../shared/types/UseCaseTypes";
import { container } from "./containerBase";


// Repositories
container.bind<UserRepository>('UserRepository').toConstantValue(new InMemoryUserRepository);
container.bind<UrlRepository>('UrlRepository').toConstantValue(new InMemoryUrlRepository);
container.bind<CacheUrlRepository>('CacheUrlRepository').toConstantValue(new InMeMoryCacheRepository);

// Controllers
container.bind<UserController>(CONTROLLERTYPES.UserController).to(UserController);
container.bind<UrlController>(CONTROLLERTYPES.UrlController).to(UrlController);
container.bind<ResolveUrlController>(CONTROLLERTYPES.ResolveUrlController).to(ResolveUrlController);

//UseCases
container.bind<CreateUserUseCase>(USECASETYPES.CreateUserUseCase).to(CreateUserUseCase);
container.bind<ListUserUseCase>(USECASETYPES.ListUserUseCase).to(ListUserUseCase);
container.bind<RetrieveUserUseCase>(USECASETYPES.RetrieveUserUseCase).to(RetrieveUserUseCase);
container.bind<ResolveUrlUseCase>(USECASETYPES.ResolveUrlUseCase).to(ResolveUrlUseCase);

container.bind<CreateUrlUseCase>(USECASETYPES.CreateUrlUseCase).to(CreateUrlUseCase);

//Logger
container.bind<Logger>('Logger').to(ConsoleLogger);
import { CreateUserUseCase } from "../application/useCases/users/CreateUserUseCase";
import { UrlRepository } from "../domain/repositories/UrlRepository";
import { UserRepository } from "../domain/repositories/UserRepository";
import { ConsoleLogger } from "../infraestructure/logging/ConsoleLogger";
import { InMemoryUrlRepository } from "../infraestructure/persistence/repositories/InMemoryUrlRepository";
import { InMemoryUserRepository } from "../infraestructure/persistence/repositories/InMemoryUserRepository";
import { UrlController } from "../interfaces/controllers/UrlController";
import { UserController } from "../interfaces/controllers/UserController";
import { Logger } from "../interfaces/middlewares/Logger";
import { CONTROLLERTYPES } from "../shared/types/ControllerTypes";
import { USECASETYPES } from "../shared/types/UseCaseTypes";
import { container } from "./containerBase";


// Repositories
container.bind<UserRepository>('UserRepository').toConstantValue(new InMemoryUserRepository);
container.bind<UrlRepository>('UrlRepository').toConstantValue(new InMemoryUrlRepository);

// Controllers
container.bind<UserController>(CONTROLLERTYPES.UserController).to(UserController);
container.bind<UrlController>(CONTROLLERTYPES.UrlController).to(UrlController);

//UseCases
container.bind<CreateUserUseCase>(USECASETYPES.CreateUserUseCase).to(CreateUserUseCase);

//Logger
container.bind<Logger>('Logger').to(ConsoleLogger);
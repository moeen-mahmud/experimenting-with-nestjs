import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // exporting cats service with other modules
  exports: [CatsService],
})
// a module class can inject providers as well

//* module's providers are not shareable everywhere, Nest encapsulates the providers inside the module scope. If we want them, then we need to import that encapsulated module.
//* however, if we want them globally we can use the @Global decorators
@Global() // -> making it global-scoped.
//* Now the CatsService providers can be imported globally. The modules that need to inject the service, doesn't need to import the CatsModule {}
export class CatsModule {
  constructor(private catsService: CatsService) {}
}

//* Note: Module classes cannot be injected as providers because of circular dependency.

//* Note: However, making everything global is not a good design decision. The imports[] array is good enough to make Module's API available to it's consumers.

// 👉 Read about Dynamic Modules

import { logger, LoggerMiddleware } from './logger/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})

//* Since, there is no property for middleware in the the above @Module decorator, we need to pass it through the configure function.
//* The below main AppModule 'implements' the NestModule and create the configure function where the consume is the actual Middleware consumer
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // note we're setting the middleware in the AppModule level. However, we can also use that in the other modules too.
    //* After applying the 'LoggerMiddleware' we're setting the middleware for the 'cats' route.
    consumer
      .apply(LoggerMiddleware, logger) // we can also apply multiple middleware
      .forRoutes(CatsController); //* forRoutes can take single / multiple strings, a RouteInfo object, a whole controller or multiple controllers separated by comma.;
    // .forRoutes('cats'); // -> forRoutes(CatsController)
    //* similarly we can also pass the exclude same as forRoutes.
  }
}

/**
 ** # if we want to add async/await to the configure function along with restricting the Middleware for a particular type of request we can do that as per the following:
 */

// export class AppModule implements NestModule {
//  async configure(consumer: MiddlewareConsumer) {
//     await consumer
//          .apply(LoggerMiddleware)
//          .forRoutes({ path: 'cats, method: RequestMethod.GET }); //* that forRoute function can also takes an object containing path and method. Here we're setting path as before and restricted the Middleware for get method only from the RequestMethod enum.
//   }
// }
//! See the Global Middleware for every routes all at once in main.tsx file.

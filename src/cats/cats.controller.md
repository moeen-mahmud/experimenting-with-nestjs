```jsx
import {
  Body,
  Controller,
  Get,
  // HostParam,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDTO } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  //* post request method decorator
  @Post()
  //* custom header.
  // @Header('Cache-Control', 'none')
  //* adding http code.
  // @HttpCode(204)
  // invoking body decorator 👇
  async create(@Body() createCatDto: CreateCatDTO) {
    // 👆 the above mentioned CreateCatDTO class helps the built-in *ValidationPipe* to filter out the properties that are not declared on the Data Type Model file. It only whitelisted the mentioned properties.
    return 'This action adds a new cat';
  }

  //* get request method decorator
  @Get()
  //* Redirect to a specific url, default status is 302. However, we can specify the status code as well.
  // @Redirect('https://nestjs.com', 301)
  findAll(): string {
    return 'This action returns all Cats';
  }

  // * Get request, then redirect
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === 5) {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
  /**
   * Route Parameters
   */
  // @Get(':id')
  //* the id will become a parameter of properties.
  // async findOne(@Param() params): Promise<string> {
  //   //* we can access the parameter as the property of the *param* [READ THIS FIRST]
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }
  // ==============================
  //* better way
  @Get(':id')
  findOneAlternate(@Param('id') id): string {
    //* same as query
    console.log(id); //* here we can directly write the parameter as a variable
    return `This actions returns an #${id} cat from the alternate universe.`;
  }

  // ? If I place the route params func above (below another route), that below path is treated like a parameter, but that shouldn't be happened.
  /**
   * Asynchronicity
   */
  //* async function must return a Promise
  @Get('promise')
  async findPromise(): Promise<any[]> {
    return ['This returns all promised cats!'];
  }
  // * It can also handles the RxJS observable pattern
  @Get()
  findAllObservable(): Observable<string[]> {
    return of(['It returns observables']);
  }
}

/**
 * Subdomain Routing
 */
// @Controller({ host: 'admin.example.com' })
// export class AdminController {
//   @Get()
//   index(): string {
//     return 'Admin Page';
//   }
// }

/**
 * Host Parameter
 */
// @Controller({ host: ':account.example.com' })
// export class AccountController {
//   @Get()
//   getInfo(@HostParam() account: string) {
//     return account;
//   }
// }

//? SCOPES
/**
 * * In NestJS, almost everything is shared for incoming requests.
 * * It has a pool of connections to the database and singleton services with global state.
 * * Since, node doesn't follow the request/response multi-threaded stateless model, where everything happens in a separate thread.
 * * It's safe to use in the app.
 */
```

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHelloService(): string {
    return "Hello";
  }
}

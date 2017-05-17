import {ILoaderService} from "./ILoaderService";
export class LoaderServiceMock implements ILoaderService{
  on(message: string = null) : void{

  }

  off(force: boolean = false): void {

  }
}

import {Controller, Get, Req, Res, UseAfter, UseBefore} from "routing-controllers";


@Controller()
export class IndexController {

  @Get('/')
  async index() {
    return 'IndexController to index'
  }
}

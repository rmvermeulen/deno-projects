import {
  Controller,
  Content,
  Get,
} from "x/alosaur/src/mod.ts";

@Controller("/home")
export class HomeController {
  @Get("/text")
  async text() {
    return Content("Hello world");
  }
  @Get("/json")
  async json() {
    return Content({ text: "test" });
  }
}

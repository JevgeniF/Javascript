import {ILogger, route} from 'aurelia';
import {JokeService} from "./services/joke-service";

@route({
  routes: [
    {
      id: 'main',
      path: '',
      component: import('./components/main'),
      title: 'Main',
    },
    {
      id: 'results',
      path: '/category/:cat',
      component: import('./components/category'),
      title: 'Results',
    },

  ]
})
export class MyApp{
  private categories : string[] = [];
  constructor(
      @ILogger private logger: ILogger,
      private JokeService: JokeService
  ) {
    this.logger = logger.scopeTo("MyApp");
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async created(){
    this.categories = await this.JokeService.getRandomCategories(3);
  }

}

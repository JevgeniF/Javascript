import {EventAggregator, ILogger, inject, IRouter} from 'aurelia';
import {JokeState} from "../../states/joke-state";

@inject()
export class Index {
    private state: JokeState;
    constructor(
        @IRouter private router: IRouter,
        @ILogger private logger: ILogger,
        JokeState: JokeState) {
        this.state = JokeState;
        this.logger = logger.scopeTo("Index");
    }

    attached() {
        this.logger.debug("attached");
    }

    async go(event: PointerEvent) {

        event.preventDefault();
        this.logger.debug("GO");
        await this.router.load('results/somevalue',
            {
                title: 'My product',
                queryParams: {
                    bar: 'one'
                }
            }
        );
    }
}

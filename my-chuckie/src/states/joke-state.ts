import {IJoke} from "../domain/IJoke";


export class JokeState{
    _jokes: IJoke[] = []

    getJokes = () => this._jokes;

    addJoke(joke : IJoke): void{
        this._jokes.push(joke);
    }
}

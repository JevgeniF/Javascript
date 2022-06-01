import {HttpClient, inject} from "aurelia";
import {IJoke} from "../domain/IJoke";

@inject()
export class JokeService {
    constructor(private httpClient: HttpClient) {
    }
    private async getCategories(url : string) : Promise<string[]>{
        return await this.httpClient.get(url, { cache: "no-store" })
            .then((data) =>{
                return data.json();
            }).catch((err) => {
                console.warn(err)
            })
    }
    async getRandomCategories(amount: number) : Promise<string[]>{
        let array : string[] = await this.getCategories("https://api.chucknorris.io/jokes/categories");
        let shuffled = array.sort(()=>{return 0.5 - Math.random()});
        return shuffled.slice(0, amount);
    }
    async getJoke(cat: string): Promise<IJoke> {
        const url = "https://api.chucknorris.io/jokes/random?category="
        return await this.httpClient.get(url + cat, { cache: "no-store" })
            .then((data) =>{
                return data.json();
            })
            .catch((err)=>{
                return err;
            });
    }
}

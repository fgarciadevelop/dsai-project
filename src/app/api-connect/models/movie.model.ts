import { PersonaModel } from "./persona.model";

export class MovieModel{

    public id: number | undefined;
    public url: string | undefined;
    public imgURL: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public year: number | undefined;
    public duration: number | undefined;
    public director: PersonaModel | undefined;
    public cast: PersonaModel[] | undefined;

    constructor(
        id?: number,
        url?: string,
        imgURL?: string,
        title?: string,
        description?: string,
        year?: number,
        duration?: number,
        director?: PersonaModel,
        cast?: PersonaModel[],
    ){
        this.id = id;
        this.url = url;
        this.imgURL = imgURL;
        this.title = title;
        this.description = description;
        this.year = year;
        this.duration = duration;
        this.director = director;
        this.cast = cast;
    }

}
  
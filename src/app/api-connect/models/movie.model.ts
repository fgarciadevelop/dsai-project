export class MovieModel{

    public id: number | undefined;
    public url: string | undefined;
    public imgURL: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public year: number | undefined;
    public duration: number | undefined;

    constructor(
        id?: number,
        url?: string,
        imgURL?: string,
        title?: string,
        description?: string,
        year?: number,
        duration?: number,
    ){
        this.id = id;
        this.url = url;
        this.imgURL = imgURL;
        this.title = title;
        this.description = description;
        this.year = year;
        this.duration = duration;
    }

}
  
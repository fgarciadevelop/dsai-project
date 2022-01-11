export class SerieModel{

    public id: number | undefined;
    public url: string | undefined;
    public imgURL: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public yearStart: number | undefined;
    public yearEnd: number | undefined;
    public seasons: number | undefined;

    constructor(
        id?: number,
        url?: string,
        imgURL?: string,
        title?: string,
        description?: string,
        yearStart?: number,
        yearEnd?: number,
        seasons?: number,
    ){
        this.id = id;
        this.url = url;
        this.imgURL = imgURL;
        this.title = title;
        this.description = description;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.seasons = seasons;
    }

}
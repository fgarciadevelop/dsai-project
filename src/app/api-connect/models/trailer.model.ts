export class TrailerModel{

    public id: number | undefined;
    public title: string | undefined;
    public url: string | undefined;
    public imgURL: string | undefined;

    constructor(
        id?: number,
        title?: string,
        url?: string,
        imgURL?: string,
    ){
        this.id = id;
        this.title = title;
        this.url = url;
        this.imgURL = imgURL;
    }

}
  
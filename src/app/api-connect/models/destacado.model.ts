export class DestacadoModel{

    public id: string | undefined;
    public type: string | undefined;
    public title: string | undefined;
    public url: string | undefined;
    public imgURL: string | undefined;

    constructor(
        id?: string,
        type?: string,
        title?: string,
        url?: string,
        imgURL?: string,
    ){
        this.id = id;
        this.type = type;
        this.title = title;
        this.url = url;
        this.imgURL = imgURL;
    }

}
  
export class PersonaModel{

    public id: number | undefined;
    public name: string | undefined;
    public imgURL: string | undefined;
    

    constructor(
        id?: number,
        name?: string,
        imgURL?: string,
    ){
        this.id = id;
        this.name = name;
        this.imgURL = imgURL;
    }

}
  
export class Permision {
    name: string;
    canSeeActual:boolean;
    canSeeWithoutPlaces: boolean;
    canSeeArchiwal: boolean;
    canAddAndModify: boolean;
    canDelete: boolean;
    constructor(name: string,
        canSeeActual:boolean,
        canSeeWithoutPlaces: boolean,
        canSeeArchiwal: boolean,
        canAddAndModify: boolean,
        canDelete: boolean){
            this.name = name;
            this.canSeeActual = canSeeActual;
            this.canSeeWithoutPlaces = canSeeWithoutPlaces;
            this.canSeeArchiwal = canSeeArchiwal;
            this.canAddAndModify = canAddAndModify;
            this.canDelete = canDelete;
        }
}

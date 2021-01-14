export class Trip {
    name: string;
    price: number;
    describtion: string;
    maxPeople: number;
    country: string;
    beginDate: string;
    endDate: string;
    currency: string;
    currentFreePlaces: number;
    imgSRC: string;
    id: number;
    averageRate:number;
    constructor(name:string, price: number, describtion: string,maxPeople: number,country: string,beginDate: string,endDate: string,currency: string,currentFreePlaces: number,imgSRC: string,id: number,averageRate:number){
        this.name = name;
        this.price = price;
        this.describtion = describtion;
        this.maxPeople = maxPeople;
        this.country = country;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.currency = currency;
        this.currentFreePlaces = currentFreePlaces;
        this.imgSRC = imgSRC;
        this.id = id;
        this.averageRate = averageRate;
    }
    
}

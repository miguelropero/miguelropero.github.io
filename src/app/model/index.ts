export class Bill {

    constructor(id: number, date_bill: string, user_id: number, value: number, type: number, observation: string){
        this.id = id;
        this.date_bill = date_bill;
        this.user_id = user_id;
        this.value = value;
        this.type = type;
        this.observation = observation
    }

    id: number;
    date_bill: string;
    user_id: number;
    value: number;
    type: number;
    observation: string; 
}
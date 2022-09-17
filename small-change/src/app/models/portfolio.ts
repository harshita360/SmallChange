import { Stock } from "./stock";
export class Portfolio{
    constructor(
        public portfolio_id:string,
        public user_id:number,
        public portfolio_category:string,
        public portfolio_name:string,
        public portfolio_balance:number,
        public stocks:Stock[] | undefined,
    ){}
}
export class Producto {
    imei: string = "";
    brand: string = '';
    model: string = '';
    price: number = 0;
    state_product_id: number = 0;

    constructor(imei: string, brand: string, model: string , price: number, state_product_id: number) {
        this.imei = imei;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.state_product_id = state_product_id;
    }
}


export class Cliente {
    customerId: number = 0;
    name: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';

    constructor(customerId: number = 0 ,  name: string, email: string, phone: string,address:string) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }



}
export class Ticket{
    id: number = 0;
    comments: string = "";
    date: string = "";
    e_ticket_state: string = "";
    client_id: number = 0;
    product_id: string = ""; 

    constructor(id:number = 0, comments: string = "", date: string = "", e_ticket_state:string = "", client_id:number = 0, product_id:string= ""){
        this.id = id;
        this.comments = comments;
        this.date = date;
        this.e_ticket_state = e_ticket_state;
        this.client_id = client_id;
        this.product_id = product_id;
    }
   
}

export class GTicket{
    imei: string = "";
    comment: string = "";

    constructor(imei:string = "", comment: string = ""){
        this.imei = imei;
        this.comment = comment;
    }}

    // export class GSolicitud{
    //     imei: string = "";
    //     comment: string = "";
    
    //     constructor(imei:string = "", comment: string = ""){
    //         this.imei = imei;
    //         this.comment = comment;}
    // }


    export class Solicitud{
    id:string="";
    state: string="";
    ticket: string="";
    createdDate: string="";
    updateDate: string="";
    ticketDate: string="";
    imeiInRevision: string="";
    comment: string="";


        constructor(id:string="", state: string="", ticket: string="",          createdDate: string="", updateDate: string="", ticketDate: string="",
            imeiInRevision: string="", comment: string=""){
                this.id = id;
                this.state = state;
                this.ticket = ticket;
                this.createdDate = createdDate;
                this.updateDate = updateDate;
                this.ticketDate = ticketDate;
                this.imeiInRevision = imeiInRevision;
                this.comment = comment;
            
        }
    }
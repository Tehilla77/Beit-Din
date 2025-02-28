export default class User {
    id!: string
    password!: string
    first_name!: string
    last_name!: string
    email!: string
    phone!: string
    address!: string
    userRole!: number

    constructor(id: string,password: string,first_name: string, last_name: string, email: string,phone: string,address: string,userRole: number) {

        this.id = id;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.userRole = userRole
    }
}

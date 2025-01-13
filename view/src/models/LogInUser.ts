export default class LogInUser {
    password!: string
    email!: string

    constructor(password: string, email: string) {
        this.password = password;
        this.email = email;
    }
}

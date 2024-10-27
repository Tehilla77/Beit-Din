import User from './User'
export default class Case {
    case_id!:number
    def_address!: string
    def_email!: string
    def_first_name!: string
    def_last_name!: string
    def_password!: string
    def_phone!: string
    defendant_id!: string
    is_decision!: boolean
    is_defedant_agree!: boolean
    issue!: string
    last_enter!: Date
    pro_address!: string
    pro_email!: string
    pro_first_name!: string
    pro_last_name!: string
    pro_password!: string
    pro_phone!: string
    prosecutor_id!: string

    // constructor(prosecutor_id: string,defendant_id: string, issue: string) {
    //     this.last_enter = new Date()
    //     this.prosecutor_id = prosecutor_id;
    //     this.defendant_id = defendant_id;
    //     this.issue = issue;
    //     this.is_defedant_agree = false;
    //     this.is_decision = false;
    // }
}

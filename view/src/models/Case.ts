export default class Case {
    last_enter!:Date
    prosecutor_id!: string
    defendant_id!: string
    issue!:string
    is_defedant_agree !:boolean
    is_decision!: boolean

    constructor(prosecutor_id: string,defendant_id: string, issue: string) {
        this.last_enter = new Date()
        this.prosecutor_id = prosecutor_id;
        this.defendant_id = defendant_id;
        this.issue = issue;
        this.is_defedant_agree = false;
        this.is_decision = false;
    }
}

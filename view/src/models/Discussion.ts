export default class Discussion {
    discussion_date!:Date
    discussion_hour!:string
    discussion_time!:number

    constructor(discussion_date: Date,discussion_hour: string, discussion_time: number) {
        this.discussion_date = discussion_date
        this.discussion_hour = discussion_hour
        this.discussion_time = discussion_time   
    }
}

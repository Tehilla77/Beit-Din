const { getDiscussions,getDiscussionById,createDiscussion} = require('../models/discussionModel');

async function GetDiscussions(req, res) {
        const dis = await getDiscussions();
        res.send(dis)
    }

async function GetDiscussionsById (req, res){
    const dis = await getDiscussionById(req.params.id);
    res.send(dis)
}
async function CreateDiscussion (req, res){
    Discussion = {
        discussion_date:req.params.discussion_date,
        discussion_hour:req.params.discussion_hour,
        discussion_time:req.params.discussion_time,
        case_id:req.params.case_id,
        protocol:req.params.protocol,
        is_finish:req.params.is_finish
    }
    const dis = await createDiscussion(Discussion)
}   

module.exports = {GetDiscussions,GetDiscussionsById};

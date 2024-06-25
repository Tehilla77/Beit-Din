const { getDiscussions,getDiscussionById} = require('../models/discussionModel');

async function GetDiscussions(req, res) {
        const dis = await getDiscussions();
        res.send(dis)
    }

async function GetDiscussionsById (req, res){
    const dis = await getDiscussionById(req.params.id);
    res.send(dis)
}

module.exports = {GetDiscussions,GetDiscussionsById};

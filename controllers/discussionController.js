const { createInquiries, getDiscussions, getDiscussionById, getDiscussionByCaseId, createDiscussion, deleteDiscussion, getInquiriesByDiscussionId } = require('../models/discussionModel');

async function GetDiscussions(req, res) {
    try {
        const dis = await getDiscussions();
        res.send(dis);
    }
    catch (error) {
        return error;
    }
}

async function DeleteDiscussion(req, res) {
    const id = req.params.id;
    try {
        const dis = await deleteDiscussion(id);
        res.send(dis);
    }
    catch (error) {
        return error;
    }
}

async function GetDiscussionsById(req, res) {
    try {
        const dis = await getDiscussionById(req.params.id);
        res.send(dis);
    }
    catch (error) {
        return error;
    }
}
async function CreateDiscussion(req, res) {
    const Discussion = {
        discussion_date: req.body.discussion_date,
        discussion_end: req.body.discussion_end,
        case_id: req.body.case_id
    }
    try {
        const dis = await createDiscussion(Discussion)
        res.send(dis)
    }
    catch (error) {
        return error;
    }
}
async function GetDiscussionByCaseId(req, res) {
    const case_id = req.params.id;
    try {
        const dis = await getDiscussionByCaseId(case_id)
        res.send(dis)
    }
    catch (error) {
        return error;
    }
}
async function CreateInquireByDisId(req, res) {
    const inquirie = {
        finish_date: req.body.finish_date,
        content_inquirie: req.body.content_inquirie,
        type_inquirie: req.body.type_inquirie,
        discussion_id: req.body.discussion_id
    }
    try {
        const inq = await createInquiries(inquirie)
        res.send(inquirie);
    }
    catch (error) {
        return error;
    }
}

async function GetInquiriesByDiscussionId(req, res) {
    const discussion_id = req.params.id;
    try {
        const inq = await getInquiriesByDiscussionId(discussion_id)
        res.send(inq);
    }
    catch (error) {
        return error;
    }
}
module.exports = { GetDiscussions, GetDiscussionsById, GetDiscussionByCaseId, CreateInquireByDisId, CreateDiscussion, DeleteDiscussion, GetInquiriesByDiscussionId };

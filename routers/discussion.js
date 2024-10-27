const express = require('express');
const discussionRouter = express.Router();
const { GetDiscussions, GetDiscussionsById, GetDiscussionByCaseId,CreateInquireByDisId,CreateDiscussion,DeleteDiscussion,GetInquiriesByDiscussionId} = require('../controllers/discussionController');

discussionRouter.route('/:id')
    .get(GetDiscussionsById)
    .delete(DeleteDiscussion)

discussionRouter.route('/createInquire')
    .post(CreateInquireByDisId)

discussionRouter.route('/inquires/:id')
    .get(GetInquiriesByDiscussionId)


discussionRouter.route('/getDiscussionByCaseId/:id')
    .get(GetDiscussionByCaseId)

discussionRouter.route('/')
    .get(GetDiscussions)
    .post(CreateDiscussion)

module.exports = discussionRouter;

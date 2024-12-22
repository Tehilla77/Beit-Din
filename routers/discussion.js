const express = require('express');
const discussionRouter = express.Router();
const { GetDiscussions, GetDiscussionsById, GetDiscussionByCaseId,CreateInquireByDisId,CreateDiscussion,DeleteDiscussion,GetInquiriesByDiscussionId} = require('../controllers/discussionController');

discussionRouter.use(express.json());
discussionRouter.use(express.urlencoded({ extended: true }));
const cors = require('cors');
discussionRouter.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend app URL
    credentials: true
}));

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

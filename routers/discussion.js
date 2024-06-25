const express = require('express');
const discussionRouter = express.Router();
const { GetDiscussions,GetDiscussionsById} = require('../controllers/discussionController');

discussionRouter.route('/')
    .get(GetDiscussions)
    

discussionRouter.route('/:id')
.get(GetDiscussionsById)
    
    module.exports = discussionRouter;

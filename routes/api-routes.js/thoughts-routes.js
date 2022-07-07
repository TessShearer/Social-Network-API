const router = require('express').Router();
const {
    getAllThought,
    getThoughtbyId,
    addThought,
    thoughtUpdate,
    thoughtDelete,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controllers');

// /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(addThought);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtbyId)
    .put(thoughtUpdate)
    .delete(thoughtDelete);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
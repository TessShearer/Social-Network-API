const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
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
    .get(getThoughtById)
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
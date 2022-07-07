const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    userCreate,
    userUpdate,
    userDelete
} = require('../../controllers/user-controllers');

// /api/users
router
    .route('/')
    .get(getAllUser)
    .post(userCreate);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(userUpdate)
    .delete(userDelete);

module.exports = router;

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list
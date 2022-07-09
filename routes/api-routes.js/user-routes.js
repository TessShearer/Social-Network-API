const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    userCreate,
    userUpdate,
    userDelete,
    friendAdd,
    friendDelete
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

router
    .route('/:userId/friends/:friendId')
    .post(friendAdd)
    .delete(friendDelete);
    // maybe change .delete to .put?

module.exports = router;
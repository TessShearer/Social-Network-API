const { User } = require('../models');

const userController = {

    // GET all Users
    getAllUser(req, res) {
        User.find({})
            // .populate({
            //     path: 'thoughts',
            //     select: '-__v'
            // })
            .select(-__v)
            .sort({ id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET one User by their ID 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate(
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friend',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST a new user
    userCreate({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => response.json(400).json(err));
    },

    // PUT to update a user by their ID
userUpdate({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'This user does not exist!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

    // DELETE a user by their ID
    userDelete({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user does not exist!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // POST to add user to friends list, /api/users/:userId/friends/:friendId

    // DELETE to remove a friend from a user's friend list, /api/users/:userId/friends/:friendId
};

module.exports = userController;
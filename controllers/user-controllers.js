const { User, Thought } = require('../models');

const userController = {

    // GET all Users
    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .sort({ id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET one User by their ID 
    getUserById({ params }, res) {
        console.log(params);
        User.findOne({ _id: params.id })
            .populate([
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                    select: '-__v'
                }
            ])
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
        console.log(body)
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.error(err)
                res.json(err).json(400)
            });
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
    async userDelete({ params }, res) {
        try {
            const _user = await User.findOneAndDelete({ _id: params.id })
            if (!_user) {
                res.status(404).json({ message: 'This user does not exist!' });
                return;
            }
            console.log(_user);
            const _thought = await Thought.find({ username: _user.username }).remove();
            res.json(_thought);
        } catch (error) {
            res.status(400).json(error)
        }
    },


    // POST to add user to friends list, /api/users/:userId/friends/:friendId
    friendAdd({ params }, res) {
        User.updateOne({ _id: params.userId }, { $addToSet: { friends: params.friendId } })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user does not exist!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err))
    },


    // DELETE to remove a friend from a user's friend list, /api/users/:userId/friends/:friendId
    friendDelete({ params }, res) {
        User.updateOne({ _id: params.userId }, { $pull: { friends: params.friendId } })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user does not exist!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err))
    },

};

module.exports = userController;
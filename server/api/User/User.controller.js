import User from './User.model';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            name, email, password
        });

        user.save();
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

export const editUser = (req, res) => {
    res.status(501).send('not implemented');
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

export const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        let user = await User.findOne({ name: name, password: password});
        console.log('user' + user)
        if (user != null) {
            return true
        } else {
            return res.status(404).json({ msg: 'User name or password are incorrect' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

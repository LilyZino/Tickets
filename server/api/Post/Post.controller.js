import Post from './Post.model';
import { informTicketsUpdated } from '../../config/sockets';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const addPost = async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            artist: req.body.artist,
            price: req.body.price,
            user: req.body.userId,
        });

        const post = await newPost.save();

        informTicketsUpdated();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

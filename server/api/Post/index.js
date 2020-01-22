/* eslint-disable object-curly-newline */
// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { getAllPosts, addPost, getPostByUser, getPost, editPost, deletePost } from './Post.controller';

const router = AsyncRouter();

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.put('/', addPost);
router.post('/', editPost);
router.get('/user/:userId', getPostByUser);
router.delete('/:id', deletePost);

export default router;

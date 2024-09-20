import { Router } from 'express';
import postsService from "../services/postsService.js";
import { errorHandler } from '../../utils/errorHandler.js';

const router = Router();
const postService = new postsService();

router.get('/', async (req, res) => {
    try {
        const posts = await postService.findAll();
        res.status(200).json(posts);
    } catch (error) {
        errorHandler(error, res);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await postService.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        errorHandler(error, res);
    }
});

router.post('/create', async (req, res) => {
    try {
        const newPost = await postService.create(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        errorHandler(error, res);
    }
});

router.patch('/update', async (req, res) => {
    try {
        const updatedPost = await postService.update(req.body);
        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        errorHandler(error, res);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await postService.delete(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        errorHandler(error, res);
    }
});

export default router;
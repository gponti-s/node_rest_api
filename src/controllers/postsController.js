import { Router } from 'express';
import postsService from "../services/postsService.js";

const router = Router();
const postService = new postsService();

router.get('/', async (req, res) => {
    try {
        const posts = await postService.findAll();
        res.status(200).json(posts);
    } catch (error) {
        if (error.message === 'Posts not found') {
            res.status(404).json({ message: error.message });
        } else {
            console.error('Error fetching posts:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await postService.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        if (error.message === 'Invalid id provided') {
            res.status(400).json({ message: error.message });
        } else if (error.message.startsWith('Post with id')) {
            res.status(404).json({ message: error.message });
        } else {
            console.error('Error fetching post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

router.post('/create', async (req, res) => {
    try {
        const newPost = await postService.create(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        if (error.message.startsWith('Invalid post data') || 
            error.message.includes('is required')) {
            res.status(400).json({ message: error.message });
        } else if (error.message === 'Post with this title already exists') {
            res.status(409).json({ message: error.message });
        } else if (error.message.startsWith('Validation error:')) {
            res.status(422).json({ message: error.message });
        } else {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await postService.update({ id: req.params.id, ...req.body });
        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        if (error.message === "Invalid post data provided" || error.message === "Post ID is required for update") {
            res.status(400).json({ message: error.message });
        } else if (error.message.startsWith("Post with id")) {
            res.status(404).json({ message: error.message });
        } else if (error.message === "Post with this title already exists") {
            res.status(409).json({ message: error.message });
        } else if (error.message.startsWith("Validation error:")) {
            res.status(422).json({ message: error.message });
        } else {
            console.error('Error updating post:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await postService.delete(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Invalid id provided") {
            res.status(400).json({ message: error.message });
        } else if (error.message.startsWith("Post with id")) {
            res.status(404).json({ message: error.message });
        } else {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

export default router;
import postsRepository from "../repositories/postesRepository.js"

class postsService {
    constructor () {
        this.postsRepository = new postsRepository();
    }

    async findAll() {
        const posts = await this.postsRepository.findAll();
        if (posts.length === 0) {
            throw new Error('Posts not found');
        }
        return posts;
    }

    async findById(id) {
        if (!id) {
            throw new Error('Invalid id provided');
        }
        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new Error(`Post with id ${id} not found`);
        }
        return post;
    }

    //TODO: check the author id
    async create(post) {
        if (!post || typeof post !== 'object' || Object.keys(post).length === 0) {
            throw new Error('Invalid post data provided');
        }

        if (!post.title || typeof post.title !== 'string' || post.title.trim() === '') {
            throw new Error('Post title is required and must be a non-empty string');
        }

        if (!post.content || typeof post.content !== 'string' || post.content.trim() === '') {
            throw new Error('Post content is required and must be a non-empty string');
        }

        try {
            const newPost = await this.postsRepository.create(post);
            if (!newPost) {
                throw new Error('Failed to create post');
            }
            return newPost;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new Error(`Validation error: ${error.message}`);
            }
            if (error.code === 11000) {
                throw new Error('Post with this title already exists');
            }
            throw new Error(`Error creating post: ${error.message}`);
        }
    }

    async update(post) {
        if (!post || typeof post !== 'object' || Object.keys(post).length === 0) {
            throw new Error("Invalid post data provided");
        }

        if (!post.id) {
            throw new Error("Post ID is required for update");
        }

        try {
            const updatedPost = await this.postsRepository.update(post.id, post);
            if (!updatedPost) {
                throw new Error(`Post with id ${post.id} not found`);
            }
            return updatedPost;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new Error(`Validation error: ${error.message}`);
            }
            if (error.code === 11000) {
                throw new Error("Post with this title already exists");
            }
            throw new Error(`Error updating post: ${error.message}`);
        }
    }

    async delete(id) {
        if (!id) {
            throw new Error("Invalid id provided");
        }

        try {
            const deletedPost = await this.postsRepository.delete(id);
            if (!deletedPost) {
                throw new Error(`Post with id ${id} not found`);
            }
            return { message: "Post deleted successfully", deletedPost };
        } catch (error) {
            throw new Error(`Error deleting post: ${error.message}`);
        }
    }
}

export default postsService;
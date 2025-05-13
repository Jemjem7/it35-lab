import { Storage } from '@ionic/storage-angular';

export interface Post {
  id: string;
  userId: string;
  username: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  userReactions: {
    [userId: string]: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry' | null;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
}

class PostService {
  private storage: Storage;
  private posts: Post[] = [];

  constructor() {
    this.storage = new Storage();
    this.init();
  }

  private async init() {
    await this.storage.create();
    const storedPosts = await this.storage.get('posts');
    if (storedPosts) {
      this.posts = storedPosts;
    }
  }

  async createPost(userId: string, username: string, content: string, imageUrl?: string): Promise<Post> {
    const newPost: Post = {
      id: Date.now().toString(),
      userId,
      username,
      content,
      imageUrl,
      createdAt: new Date(),
      reactions: {
        like: 0,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0
      },
      userReactions: {},
      comments: []
    };

    this.posts.unshift(newPost);
    await this.savePosts();
    return newPost;
  }

  async updatePost(postId: string, content: string, imageUrl?: string): Promise<Post | null> {
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return null;

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      content,
      imageUrl: imageUrl || this.posts[postIndex].imageUrl
    };

    await this.savePosts();
    return this.posts[postIndex];
  }

  async deletePost(postId: string): Promise<boolean> {
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return false;

    this.posts.splice(postIndex, 1);
    await this.savePosts();
    return true;
  }

  async addReaction(postId: string, userId: string, reactionType: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'): Promise<Post | null> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    // Remove previous reaction if exists
    const previousReaction = post.userReactions[userId];
    if (previousReaction) {
      post.reactions[previousReaction]--;
    }

    // Add new reaction
    post.userReactions[userId] = reactionType;
    post.reactions[reactionType]++;

    await this.savePosts();
    return post;
  }

  async removeReaction(postId: string, userId: string): Promise<Post | null> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const reaction = post.userReactions[userId];
    if (reaction) {
      post.reactions[reaction]--;
      delete post.userReactions[userId];
    }

    await this.savePosts();
    return post;
  }

  async addComment(postId: string, userId: string, username: string, content: string): Promise<Post | null> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const newComment: Comment = {
      id: Date.now().toString(),
      userId,
      username,
      content,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await this.savePosts();
    return post;
  }

  async deleteComment(postId: string, commentId: string): Promise<Post | null> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    post.comments = post.comments.filter(c => c.id !== commentId);
    await this.savePosts();
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    return [...this.posts];
  }

  private async savePosts() {
    await this.storage.set('posts', this.posts);
  }
}

export const postService = new PostService(); 
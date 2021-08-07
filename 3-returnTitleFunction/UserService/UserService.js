import UserProvider from "../UserProvider/UserProvider";

export default class UserService {
  constructor(userProvider) {
    this.userProvider = userProvider;
  }

  getUsers(posts) {
    const users = {};

    try {
      posts.forEach(post => {
        if (users.hasOwnProperty(post.userId)) {
          users[post.userId].posts.push(post);
        } else {
          users[post.userId] = {
            posts: [post]
          };
        }
      });
    } catch (err) {
      throw new Error("No posts found");
    }

    return users;
  }

  async getPostsFromMostPostedUser() {
    const posts = await this.userProvider.getPosts();

    const users = this.getUsers(posts);

    let postsFromMostPostedUser = {};

    for (const userId in users) {
      if(Object.keys(postsFromMostPostedUser).length === 0) {
        postsFromMostPostedUser = users[userId];
      }
      
      if (users[userId].posts.length > postsFromMostPostedUser.posts.length) {
        postsFromMostPostedUser = users[userId];
      }
    }

    return postsFromMostPostedUser.posts
  }

  async getPostsTitles() {
    let posts;

    posts = await this.getPostsFromMostPostedUser();
    return posts.map(post => post.title);
  }
}
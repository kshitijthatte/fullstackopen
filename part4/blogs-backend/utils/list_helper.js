var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favoriteBlogIndex = blogs.reduce((a, blog) => Math.max(blog.likes));
  return {
    title: blogs[favoriteBlogIndex].title,
    author: blogs[favoriteBlogIndex].author,
    likes: blogs[favoriteBlogIndex].likes,
  };
};

const mostBlogs = (blogs) => {
  return 1;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};

/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
(() => {
  const API = 'https://gorest.co.in/public/v1/';
  const POST_PAGE = 'post.html';
  const LIST_PAGE = 'index.html';
  const pageParams = new URLSearchParams(window.location.search);
  const paramPage = pageParams.get('page');
  const paramId = pageParams.get('id');
  const isOpenIndexPage = paramPage > 0;
  const isOpenPostPage = paramId > 0;

  async function request(url) {
    const response = await fetch(url);
    return await response.json();
  }

  async function loadPage(page) {
    const param = page ? `?page=${page}` : '';
    const url = `${API}/posts${param}`;
    return await request(url);
  }

  async function loadPost(id) {
    const url = `${API}/posts?id=${id}`;
    return await request(url);
  }

  async function loadComments(id) {
    const url = `${API}/comments?post_id=${id}`;
    return await request(url);
  }

  function createListOfPosts() {
    const list = document.createElement('ul');
    list.classList.add('list-posts');
    return list;
  }

  function createItemOfPost(element) {
    const item = document.createElement('li');
    const link = document.createElement('a');

    item.classList.add('item-post');
    link.classList.add('link-post');
    link.setAttribute('href', `${POST_PAGE}?id=${element.id}`);
    link.textContent = element.title;

    item.append(link);
    return item;
  }

  function createButtonOfPagination(page) {
    const button = document.createElement('a');
    button.classList.add('btn-pagination');
    button.setAttribute('href', `${LIST_PAGE}?page=${page}`);
    button.textContent = page;
    return button;
  }

  function createTitleOfPost(element) {
    const title = document.createElement('h1');
    title.classList.add('title-post');
    title.textContent = element.title;
    return title;
  }

  function createInfoOfPost(element) {
    const body = document.createElement('p');
    body.classList.add('info-post');
    body.textContent = element.body;
    return body;
  }

  function createListOfComments() {
    const list = document.createElement('ul');
    list.classList.add('list-comments');
    return list;
  }

  function createItemOfComment(element) {
    const item = document.createElement('li');
    const name = document.createElement('span');
    const text = document.createElement('span');

    item.classList.add('item-comment');
    name.classList.add('item-name');
    text.classList.add('item-text');

    name.textContent = element.name;
    text.textContent = element.body;

    item.append(name);
    item.append(text);
    return item;
  }

  function getLoopsPostsAndPagination(container, data) {
    const listOfPosts = createListOfPosts();
    container.append(listOfPosts);
    data.data.forEach((element) => {
      const itemOfPost = createItemOfPost(element);
      listOfPosts.append(itemOfPost);
    });

    for (let i = 1; i <= data.meta.pagination.pages; i++) {
      const buttonOfPagination = createButtonOfPagination(i);
      container.append(buttonOfPagination);
    }
  }

  async function showListPage(container) {
    const data = await loadPage(paramPage);
    getLoopsPostsAndPagination(container, data);

    const buttons = document.querySelectorAll('.btn-pagination');
    buttons.forEach((button) => {
      button.classList.remove('btn--active');
    });
    buttons[paramPage - 1].classList.add('btn--active');
  }

  async function showListPageNaN(container) {
    const data = await loadPage();
    getLoopsPostsAndPagination(container, data);

    const btn = document.querySelector('.btn-pagination');
    btn.classList.add('btn--active');
  }

  async function showComments(container) {
    const listOfComments = createListOfComments();
    const dataWithComments = await loadComments(paramId);
    container.append(listOfComments);

    dataWithComments.data.forEach((element) => {
      const comment = createItemOfComment(element);
      listOfComments.append(comment);
    });
  }

  async function showPostPage(container) {
    const dataWithPost = await loadPost(paramId);
    const titleOfPost = createTitleOfPost(dataWithPost.data[0]);
    const infoOfPost = createInfoOfPost(dataWithPost.data[0]);

    container.append(titleOfPost);
    container.append(infoOfPost);
    showComments(container);
  }

  async function createApp(container) {
    if (isOpenPostPage) {
      showPostPage(container);
    } else {
      isOpenIndexPage ? showListPage(container) : showListPageNaN(container);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    createApp(document.getElementById('blog-app'));
  });
})();

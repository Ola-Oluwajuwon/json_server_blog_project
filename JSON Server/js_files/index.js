// JavaScript for the index.html

const container = document.querySelector(".blogs");
const searchForm = document.querySelector(".search");

const renderPosts = async term => {
  let uri = "http://localhost:3000/posts?_sort=likes&_order=desc";

  if (term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);

  const posts = await res.json();

  let template = "";
  posts.forEach(post => {
    template += `
        <div class='bg-white py-4 px-3 rounded text-black my-4'>
            <h2>${post.title}</h2>
            <p><small>${post.likes} likes</small></p>
            <p>${post.body.slice(0, 200)}</p>
            <a href='./details.html?id=${
              post.id
            }' target='_blank' class='text-info'>Read more...</a>
        </div>
    `;
  });

  container.innerHTML = template;
};

searchForm.addEventListener("submit", e => {
  e.preventDefault();

  renderPosts(searchForm.term.value.trim());
});

window.addEventListener("DOMContentLoaded", () => renderPosts());

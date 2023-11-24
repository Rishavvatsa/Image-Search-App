const accesskey = "J0Ak9VrSeJTQvDTK7PzovLGayylKo9UU8bMYPsozl7o";
const searchinput = document.getElementById("search-input");
const formEl = document.querySelector("form");
const searchResult = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-btn");
let page = 1;

const searchImages = async () => {
  const inputdata = searchinput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  results.map((res) => {
    const imagewrapper = document.createElement("div");
    imagewrapper.classList.add("search");
    const image = document.createElement("img");
    image.src = res.urls.small;
    image.alt = res.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = res.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = res.alt_description;
    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imageLink);
    searchResult.appendChild(imagewrapper);
  });

  page++;
  if (page > 1) {
    showmore.style.display = "block";
  }
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showmore.addEventListener("click", () => {
  searchImages();
});

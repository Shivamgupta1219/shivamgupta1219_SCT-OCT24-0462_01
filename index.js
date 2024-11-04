
const apiKey = "7c2acae93f054cc78fb56176c7454e32";

const blogContainer = document.getElementById("blog-container");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

// Fetch top headlines news by default
async function fetchRandomNews(query = "") {
  try {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    if (query) {
      apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}


async function fetchNewsQuery(query){
    try {
        let apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        if (query) {
          apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        }
    
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
      } catch (error) {
        console.error("Error fetching random news", error);
        return [];
      }

    }
function displayBlogs(articles) {
  blogContainer.innerHTML = ""; // Clear the container
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.urlToImage || "https://placehold.co/600x400"; // Fallback image
    img.alt = article.title;

    const title = document.createElement("h2");
    title.textContent = article.title;

   

    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

// Fetch and display the initial news articles
(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();

// Add search functionality
searchButton.addEventListener("click" , async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("error fetching by query", error);
    }
  }
});

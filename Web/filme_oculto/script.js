const apiUrl = "http://localhost:3000"

window.fetchMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/movies`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};

window.fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/api/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar informações do filme:", error);
    return null;
  }
};

window.renderMovies = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const movieId = queryParams.get("filme");

  if (movieId) {
    const movie = await fetchMovieById(movieId);
    if (movie) {
      showMovie(movie);
    } else {
      window.history.pushState({}, "", window.location.pathname);
      alert("Filme não encontrado.");
      window.location.reload();
    }
  } else {
    const movies = await fetchMovies();
    const movieList = document.getElementById("movie-list");

    movieList.innerHTML = movies
      .map((movie) => {
        const shortDescription =
          movie.description.length > 80
            ? movie.description.slice(0, 80) + "..."
            : movie.description;
        return `
              <div class="movie" onclick="showMovieDetails(${movie.id})">
                  <h3>${movie.title} (${movie.year})</h3>
                  <p>${shortDescription}</p>
              </div>
          `;
      })
      .join("");
  }
};

window.showMovieDetails = async (movieId) => {
  const movie = await fetchMovieById(movieId);
  if (movie) {
    showMovie(movie);
  }
};

window.showMovie = (movie) => {
  document.getElementById(
    "modal-title"
  ).innerText = `${movie.title} (${movie.year})`;
  document.getElementById("modal-description").innerText = movie.description;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
  document.body.style.overflow = "hidden";
  document.querySelector("header").style.pointerEvents = "none";
  document.body.classList.add("modal-open");
  document.body.style.paddingRight = `${
    window.innerWidth - document.documentElement.clientWidth
  }px`;

  const newUrl = `${window.location.pathname}?filme=${movie.id}`;
  window.history.pushState({ movieId: movie.id }, "", newUrl);
};

window.closeModal = () => {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
  document.body.style.overflow = "auto";
  document.querySelector("header").style.pointerEvents = "auto";
  document.body.classList.remove("modal-open");
  document.body.style.paddingRight = "";
  const originalUrl = window.location.pathname;
  window.history.pushState({}, "", originalUrl);
  renderMovies();
};

const searchInput = document.getElementById("search-input");

window.toggleSearchInput = () => {
  searchInput.classList.toggle("show");
  if (searchInput.classList.contains("show")) {
    searchInput.focus();
  }
};

window.expandSearchInput = () => {
  searchInput.classList.add("show");
};

window.collapseSearchInput = () => {
  if (!searchInput.value) {
    searchInput.classList.remove("show");
  } else {
    searchInput.value = "";
  }
};

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.toLowerCase();
  const allMovies = await fetchMovies();
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(query)
  );
  renderFilteredMovies(filteredMovies);
});

document.addEventListener("click", (event) => {
  if (
    !searchInput.contains(event.target) &&
    !event.target.closest(".search-btn")
  ) {
    collapseSearchInput();
  }
});

window.renderFilteredMovies = (movies) => {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = movies
    .map((movie) => {
      const shortDescription =
        movie.description.length > 80
          ? movie.description.slice(0, 80) + "..."
          : movie.description;
      return `
            <div class="movie" onclick="showMovieDetails(${movie.id})">
                <h3>${movie.title} (${movie.year})</h3>
                <p>${shortDescription}</p>
            </div>
        `;
    })
    .join("");
};

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    header.classList.add("hidden");
    header.classList.remove("visible");
  } else {
    header.classList.add("visible");
    header.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

renderMovies();

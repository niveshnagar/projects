const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
      <img src = "${imgSrc}"/>
      <span>${movie.Title} (${movie.Year})</span> 
      `;
  },

  inputValue(movie) {
    return movie.Title;
  },

  async fetchData(searchString) {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: "e8ab75bf",
        s: searchString,
      },
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector(".left-autocomplete"),
  onOptionSelect(movie) {
    const tutorialBanner = document.querySelector(".tutorial");
    tutorialBanner.classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#leftDetailElement"), "left");
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector(".right-autocomplete"),
  onOptionSelect(movie) {
    onMovieSelect(
      movie,
      document.querySelector("#rightDetailElement"),
      "right"
    );
  },
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, detailElement, side) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "e8ab75bf",
      i: movie.imdbID,
    },
  });
  detailElement.innerHTML = movieTemplate(response.data);
  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }
  if (leftMovie && rightMovie) {
    runComparison();
  }
};

function runComparison() {
  const left = document.querySelectorAll("#leftDetailElement .notification");
  const right = document.querySelectorAll("#rightDetailElement .notification");

  for (i = 0; i < 5; i++) {
    const leftElement = left[i];
    const rightElement = right[i];
    console.log(leftElement, rightElement);
    if (leftElement.dataset.value < rightElement.dataset.value) {
      leftElement.classList.remove("is-primary");
      leftElement.classList.add("is-warning");
    } else if (leftElement.dataset.value > rightElement.dataset.value) {
      rightElement.classList.remove("is-primary");
      rightElement.classList.add("is-warning");
    }
  }
}

function movieTemplate(movieDetail) {
  // 1 awards
  // i am trying motherfucka!
  let sum = 0;
  const members = movieDetail.Awards.split(" ");

  for (i = 0; i < members.length; i++) {
    members[i] = parseInt(members[i]);
  }

  const arr = members.filter((value) => {
    const a = typeof value;
    if (a === "number") {
      return value;
    }
  });

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  const awards = sum;

  // 2 box office
  const boxOfficeCollection = parseFloat(
    movieDetail.BoxOffice.slice(1).replaceAll(",", "")
  );

  // 3 meta score
  const metaScore = parseFloat(movieDetail.Metascore);

  // 4 imdb rating
  const imdbRating = parseFloat(movieDetail.imdbRating);

  // 5 imdb votes
  const imdbVotes = parseFloat(movieDetail.imdbVotes.replaceAll(",", ""));

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot.slice(0, 175)}...</p>
        </div>
      </div>
    </article>

    <article data-value ="${awards}" class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value ="${boxOfficeCollection}" class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value ="${metaScore}" class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value ="${imdbRating}" class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value ="${imdbVotes}" class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
}

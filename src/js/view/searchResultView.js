class SearchResult {
  _data;
  _searchBox = document.querySelector(".search-box");

  render(data) {
    this._data = data;
    const markUp = this._genrateMarkup();
    // console.log(markUp);
    this._searchBox.querySelector(".searchMain").innerHTML = "";
    this._searchBox
      .querySelector(".searchMain")
      .insertAdjacentHTML("afterbegin", markUp);
  }

  _genrateMarkup() {
    const markUp = `
    <div class = "resultBox">
    ${this._data
      .slice(0, 4)
      .map((el) => {
        return `  
        <a href = "#${el.id}" class="movieSearch">
         <div class="searchedPoster">
           <div class="searchedPoster-img">
              <img src="${
                el.posterPath.slice(-4) !== "null"
                  ? el.posterPath
                  : "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
              }" alt="image" style="width: 100%; height: 100%; ${
          el.posterPath.slice(-4) !== "null"
            ? "hi"
            : "object-fit:cover;object-position: -1rem;"
        }">
           </div>
         </div>
         <div class="searchedDetails">
           <p class="searchedDetails-name">${el.movieName}</p>
           <div class="searchedDetails-date">
             <p>${el.releaseDate.toDateString() !== "Invalid Date" ? el.releaseDate.toDateString().slice(4) : ""}</p>
             <p class="searchedDetails-date_lang" ${el.releaseDate.toDateString() === "Invalid Date" ? "style = 'margin-left : 1rem' " : ""} >${el.language}</p>
           </div>
             <p class="searchedDetails-genre">${el.genre}</p>
         </div>
        </a>`;
      })
      .join("")}
    <button type = "submit" class="moreResults">
      View all results &rarr;
    </button>
    </div>
    `;
    return markUp;
  }

  addClass() {
    this._searchBox.classList.add("searchFocus");
  }

  removeResultBox() {
    this._searchBox.classList.remove("searchFocus");
    this._searchBox.querySelector(".nav-search__input").value = "";
    this._searchBox.querySelector(".searchMain").innerHTML = "";
  }

  addHandlerSearch(func) {
    const searchBar = this._searchBox.querySelector(".nav-search__input");
    const searchBox = document.querySelector(".search-box");
    // searchBar.addEventListener("input", function (e) {
    //   e.preventDefault();
    //   query = searchBar.value;

    //   if (searchBar.value.length >= 2) {
    //     func(searchBar.value);
    //   } else if (searchBar.value.length < 2) {
    //     searchBox.classList.remove("searchFocus");
    //     searchBox.querySelector(".searchMain").innerHTML = "";

    //     return;
    //   }
    // });

    
    let typingTimer; // Timer identifier
    const doneTypingInterval = 600; // Time in milliseconds (0.5 seconds)

    // Function to handle the API request
    function sendRequest(query) {
      // Perform your API request here

      if (query.length >= 2) {
        func(query);
        searchBox.querySelector(".searchMain").classList.remove("main-none");

      } else if (query.length < 2) {
        searchBox.classList.remove("searchFocus");
        searchBox.querySelector(".searchMain").innerHTML = "";
        searchBox.querySelector(".searchMain").classList.add("main-none");

      }

    }

    // Event listener for input event
    searchBar.addEventListener("input", function (e) {
      const value = e.target.value;

      clearTimeout(typingTimer); // Clear the previous timer
      typingTimer = setTimeout(() => {
        sendRequest(value);
      }, doneTypingInterval); // Start a new timer
    });
  }
  renderError() {
    const markUp = `
   <div class="errorBox">
   <div class="errorMessage">
     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
       <path d="M14.8284 16.1716C13.2663 14.6095 10.7336 14.6095 9.17151 16.1716M15 10H14.99M9 10H8.99M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="#be123c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>

      <p class="errorM">No results found!</p>
   </div>
   </div>
   `;
    this._searchBox.querySelector(".searchMain").innerHTML = "";

    this._searchBox
      .querySelector(".searchMain")
      .insertAdjacentHTML("beforeend", markUp);
  }
  hideSearchMain() {
    this._searchBox.querySelector(".searchMain").classList.add("main-none");
  }
  hideErrorMessage() {
    this._searchBox.querySelector(".searchMain").classList.remove("main-none");
  }
}

export default new SearchResult();

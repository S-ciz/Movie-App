//global variables
var pop = document.getElementById("popular");
var body = document.querySelector("body");

/*
const url = "https://yts.mx/api/v2/list_movies.json?limit=50&page=30"
fetch(url)
.then(res=>res.json())
.then(data=>{
  console.log(data.data.movies)
})
*/

//create display function to return html
function popular(img, title, id) {
  return ` <div class="card   border-0" ">
    <img loading="eager" src="${img}" class="card-img-top img-fluid " alt="...">
    <div style="background:black;" class="card-body  text-light">
      <p class="card-text text-light fw-bold">${trancate(title, 4)}</p>
      <a href="movie.html" id="click" style="background: red;" class=" btn btn-sm d-grid   text-light" >
      <span class="identify" style="display:none;">${id}</span>
     Details
      </a>
    </div>
  </div>
`;
}

//create class
class UI {
  static load() {
    window.addEventListener("load", (e) => {
      UI.Display(
        "https://yts.mx/api/v2/list_movies.json?query_term=my christmas"
      );
    });
  }

  static Display(key) {
    //fetch api

    fetch(key)
      .then((res) => res.json())
      .then((data) => {
        //get array of movies
        var arr = data.data.movies;
        arr.sort((a, b) => {
          return a.year - b.year;
        });
        //limit the length for css grid ( repeat4, 1fr)
        arr.length = 4;

        //loop through aray
        for (let ar of arr) {
          //set innerhtml of population div
          pop.innerHTML += popular(ar.medium_cover_image, ar.title, ar.id);
        }
      })
      //catch errors and display on dom
      .catch((err) => {
        var Head = document.getElementById("remove");
        Head.remove();
        body.classList =
          "d-block  text-center d-grid mt-5 pt-5 m-auto text-light";
        body.innerHTML = `<div class="container w-100 justify-content-center text-center"> 
        <img loading="eager" style="width:8rem" class="img-fluid " src="/img/error.png" alt="...">
        <p class="text-light">Connect to the Internet!</p>
        <a style="background:red;" href="index.html" class="btn btn-sm text-light ">Reload Page</a>
        </div>
        `;
      });
  }
}

//call functions
UI.load();

//add event listener for more information on movie

pop.addEventListener("click", check);

var movies = document.querySelector("section#result");
movies.addEventListener("click", check);

//input event

//global input variables
var form = document.getElementById("form");
var input = document.getElementById("input");

//listen for submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //validation
  if (input.value === "") {
    //call validation function
    msg("Please Enter Movie", "danger");
  } else {
    //call validation function
    msg("Loading movie...");
    //fetch data
    fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${input.value}`)
      .then((res) => res.json())
      .then((data) => {
        //get array
        var arr = data.data.movies;
        var movies = document.querySelector("section#result");
        var main = document.querySelector("main#list");
        const show = document.getElementById("that");
        const span = document.getElementById("remove");

        //remove pop
        pop.remove();

        show.className = "d-block";
        span.className = "d-none";
        movies.innerHTML = " ";

        //loop through array and reverse
        arr = arr.sort((a, b) => {
          return a.year - b.year;
        });

        arr = arr.reverse();

        for (let ar of arr) {
          //set to dom
          main.style.padding = "2rem";

          movies.innerHTML += popular(ar.medium_cover_image, ar.title, ar.id);
        }
      }) //catch errors of input
      .catch((err) => {
        console.log(err);
        return msg(
          `Sorry, could not find ${input.value.toUpperCase()}`,
          "danger"
        );
      });
  }
});

//Validation function
function msg(msg, clas) {
  //create div
  var div = document.createElement("div");

  div.textContent = msg;
  //div classlist
  div.classList = `w-80 text-light container w-80 btn-${clas} btn-sm m-auto mb-3 text-center`;
  //insertbefore
  form.insertBefore(div, input);

  //remove div after 5 seconds
  setTimeout(() => {
    div.remove();
  }, 5000);
}

//truncate word
function trancate(word, count) {
  //set word to arr
  var res;
  res = word.split(" ");
  res.length = count;

  return res.join(" ");
}

//set id to local storage
function check(e) {
  var res;
  var a = e.target.classList.contains("btn-sm");
  if (a) {
    res = e.target.firstElementChild.innerHTML;
    //set movie name to local storage
    localStorage.setItem("Id", res);
  }
}

//transform

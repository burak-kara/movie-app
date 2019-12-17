let url = "http://ec2-52-56-129-37.eu-west-2.compute.amazonaws.com:8888/";
// let url = "http://localhost:8888/";

// Movie
export function addMovie(data) {
    return post("/movies", data);
}

function getMovie(id) {
    return get("/movies/" + id);
}

function getAllMovies() {
    return get("/movies");
}

function updateMovie(id, data) {
    return put("/movies/" + id, data);
}

// Director
export function addDirector(data) {
    return post("/directors", data)
}

export function getDirector(id) {
    return get("/directors/" + id);
}

export function getAllDirectors() {
    return get("/directors");
}

export function updateDirector(id, data) {
    return put("/directors/" + id, data);
}

// User
export function addUser(data) {
    return post("/users", data);
}

function getUser(id) {
    return get("/users/" + id);
}

function getAllUsers() {
    return get("/users");
}

function updateUser(id, data) {
    return put("/users/" + id, data);
}

function get(request) {
    let xmlHttp = new XMLHttpRequest();
    let requestURL = url + request;
    xmlHttp.open("GET", requestURL, false); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
}

function post(request, data) {
    let xmlHttp = new XMLHttpRequest();
    let requestURL = url + request;
    xmlHttp.open("POST", requestURL, false); // false for synchronous request
    xmlHttp.send(data);
    return xmlHttp.responseText;
}

function put(request, data) {
    let xmlHttp = new XMLHttpRequest();
    let requestURL = url + request;
    xmlHttp.open("PUT", requestURL, false); // false for synchronous request
    xmlHttp.send(data);
    return xmlHttp.responseText;
}
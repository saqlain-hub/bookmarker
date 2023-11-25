// listen for form submit

const form = document.getElementById("myForm");
const result = document.getElementById("bookmarksResult");

form.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault();

  // get form values
  let siteName = document.getElementById("siteName").value;
  let siteUrl = document.getElementById("siteUrl").value;

  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  let bookmark = {
    name: siteName,
    url: siteUrl,
  };

  // test if bookmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    // init array
    let bookmarks = [];
    // add to array
    bookmarks.push(bookmark);
    // set to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // add bookmark to array
    bookmarks.push(bookmark);

    // Reset back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  form.reset();

  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  let bookmarkHTML = "";

  bookmarks.forEach((bookmark) => {
    let url = bookmark.url;
    let name = bookmark.name;
    let pat = bookmark.url;
    bookmarkHTML += `
    <div class="well">
        <h3>${name}</h3>
        <a href="${url}" target="_blank">Visit</a>
        <button onclick="deleteBookmark('${url}')">Delete</button>
    </div>
    `;
  });
  result.innerHTML = bookmarkHTML;
}

// delete bookmark
function deleteBookmark(url) {
  // get bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // loop through bookmarks
  bookmarks.forEach((bookmark, index) => {
    if (bookmark.url == url) {
      bookmarks.splice(index, 1);
    }
  });

  // reset back to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchBookmarks();
}

function testLocalStorage() {
  setTimeout(() => {
    localStorage.setItem("test", "hello world");
  }, 1000);

  setTimeout(() => {
    console.log(localStorage.getItem("test"));
  }, 3000);

  setTimeout(() => {
    localStorage.removeItem("test");
    console.log(localStorage.getItem("test"));
  }, 6000);
}

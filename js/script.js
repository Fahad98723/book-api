const bookNameText = document.getElementById('book-name');
const messages = document.getElementById('messages');
const bookContainer = document.getElementById('books');
const spinner = document.getElementById('spinner');
spinner.style.display = 'none'

//fetch data function 
const fetchData = async(url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

//books loading
const loadBooks = () => {
    const bookName = bookNameText.value;
    bookNameText.value = '';  // input value clear 
    bookContainer.innerHTML = '';  // book container clear
    spinner.style.display = 'block' // spinner start 
    messages.innerText = '' // error messages and messages clear

    if (bookName === '') {
        messages.innerText = 'Please write something'
        //error message for empty input
        spinner.style.display = 'none' //spinner remove
    }
    else{
        fetchData(`https://openlibrary.org/search.json?q=${bookName}`)
        .then(data => displayBooks(data.docs))
    }
}
const displayBooks = (books) => {
    
    //error message for ranodm names
    if (books.length === 0) {
        messages.innerText = 'result not found'
    }
    bookContainer.innerHTML = '';
    spinner.style.display = 'none' //spinner remove

    books.forEach(book => {
        messages.innerText = `Here is result of ${books.length} Books`
        const div = document.createElement('div');
        const coverImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
              <img src="${coverImage}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title"><span class="fw-bold">Book Name :</span> ${book.title}</h5>
                <p class="card-text"><span class="fw-bold">Author Name :</span> ${book?.author_name?.slice(0,1)}</p>
                <p class="card-text"><span class="fw-bold">Publisher Name :</span> ${book?.publisher?.slice(0,1)}</p>
              </div>
              <div class="card-footer bg-warning text-dark">
                <small class="text-dark">First Publish Year : ${book.first_publish_year? book.first_publish_year: 'Data Not found'}</small>
              </div>
            </div>
        `
        bookContainer.appendChild(div)
    });
    
    // Checking Publish Date, Publisher and author name are Exist
    var p = document.getElementsByTagName('p');
    for (const pText of p) {
        if (pText.innerText === "Author Name : undefined") {
            pText.innerHTML = `<span class="fw-bold">Author Name :</span> Data Not Found`;
        }
        else if (pText.innerText === "Publisher Name : undefined") {
            pText.innerHTML = `<span class="fw-bold">Publisher Name :</span> Data Not Found`;
        }
    }
}

// style
document.querySelectorAll(".text-input").forEach( (element) => {
    element.addEventListener('blur', (e) => {
        if ( e.target.value != "") {
            e.target.classList.add('filled');
        } else {
            e.target.classList.remove('filled');
        }
    });
});
        
document.querySelector('.search').addEventListener('blur', (e) => {
    if ( e.target.value != "") {
        e.target.classList.add('filled');
    } else {
        e.target.classList.remove('filled');
    }
});

// variabel
const titleInput = document.getElementById('title');
const publisherInput = document.getElementById('publisher');
const yearInput = document.getElementById('year');
const searchInput = document.getElementById('search');
const submit = document.getElementById('submit');
const submitBtn = document.getElementById('submit-btn')
const changeBtn = document.getElementById('change');
const searchBtn = document.getElementById('search-btn');

let library = [];


document.addEventListener('DOMContentLoaded', function () {
    
});
// change
let readed = false;
changeBtn.addEventListener('click', (e) => {
    if(readed == false){
        e.target.classList.remove('change-btn-unread')
        e.target.classList.add('change-btn-readed')
        submitBtn.classList.remove('submit-btn-unread')
        submitBtn.classList.add('submit-btn-readed')
        return readed = true
    }else{
        e.target.classList.add('change-btn-unread')
        e.target.classList.remove('change-btn-readed')
        submitBtn.classList.add('submit-btn-unread')
        submitBtn.classList.remove('submit-btn-readed')
        return readed = false
    }
});
// submit
submit.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = titleInput.value;
    const publisher = publisherInput.value;
    const year = yearInput.value;
    const id = generateId();
    const bookObject = generateBookObject(title, publisher, year, id, readed);
    library.push(bookObject);

    document.dispatchEvent(render);

});
function generateBookObject(title, publisher, year, id, readed) {
    return {
        title,
        publisher,
        year,
        id,
        readed,
    };
};
function generateId() {
    return +new Date();
};
// membuat elemen html
function makeBook(bookObject) {
    const container = document.createElement('div')
    
    const textTitle = document.createElement('h2');
    textTitle.innerText = bookObject.title;
    
    // tabel
    const table = document.createElement('table');

    const tr1 = document.createElement('tr');

    const publisher = document.createElement('td');
    publisher.innerText = 'Publisher';

    const textPublisher = document.createElement('td');
    textPublisher.innerText = bookObject.publisher;

    const colon1 = document.createElement('td');
    colon1.innerText = ':';

    const tr2 = document.createElement('tr');

    const year = document.createElement('td');
    year.innerText = 'Year';

    const textYear = document.createElement('td');
    textYear.innerText = bookObject.year;
    
    const colon2 = document.createElement('td');
    colon2.innerText = ':';

    tr1.appendChild(publisher);
    tr1.appendChild(colon1);
    tr1.appendChild(textPublisher);

    tr2.appendChild(year);
    tr2.appendChild(colon2);
    tr2.appendChild(textYear);

    table.appendChild(tr1);
    table.appendChild(tr2);
    // button x
    const close = document.createElement('div');
    close.innerText = 'X';

    // button change
    const change = document.createElement('div');
    const bookIcon = document.createElement('i');
    bookIcon.classList.add('fa-solid');
    bookIcon.classList.add('fa-book');
    change.appendChild(bookIcon);
    
    container.appendChild(close);
    container.appendChild(textTitle);
    container.appendChild(table);
    container.appendChild(change);

    // event 
    close.addEventListener('click', function() {
        del(bookObject.id);
    });
    change.addEventListener('click', function(){
        chg(bookObject.id);
    } );
    return container;
};

// menampilkan ke halaman web
const render = new Event('render');
document.addEventListener('render', function(){
    const unreadBookContainer = document.querySelector('.unread-book-container');
    unreadBookContainer.innerHTML = '';
    const readedBookContainer = document.querySelector('.readed-book-container');
    readedBookContainer.innerHTML = '';
    for (const book of library) {
        const bookElement = makeBook(book);
        if(book.readed == false){
            unreadBookContainer.appendChild(bookElement);
        } else{
            readedBookContainer.appendChild(bookElement);
        }
    };
});

// fungsi event delete dan change
function del(id) {
    const bookTarget = findId(id);
    if(bookTarget === -1) return;
    library.splice(bookTarget, 1);
    document.dispatchEvent(render);
};
function chg(id) {
    console.log('test')
    const bookTarget = findId(id);
    if(bookTarget === -1) return;
    if (library[bookTarget].readed == false){
        library[bookTarget].readed = true;
    }else{
        library[bookTarget].readed = false;
    };
    document.dispatchEvent(render);
}

function findId(id){
    for (const index in library){
        if (library[index].id === id) {
            return index;
        }
    }
    return -1
};





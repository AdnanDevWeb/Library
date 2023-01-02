  // elements
const createBookBtn = document.querySelector('[data-createBookBtn]')
const form = document.querySelector('form')
const body = document.querySelector('body')
const booksSection = document.querySelector('#booksSection')
    // books input
const bookTitleName = document.querySelector('#bookName')
const bookAuthorName = document.querySelector('#authorName')
const bookPages = document.querySelector('#pageInput')
const bookReaded = document.querySelector('#checkboxInput')


let booksArray = [];
class Books{
    constructor(title,author,page,readed,id){ // str str num boolean
        this.title = title
        this.author = author
        this.page = page
        this.readed = readed;
        this.id = id
    }
}





// funcs
function revealBtn(e){
    form.classList.toggle('formReveal')
    booksSection.classList.toggle('blur')
}
function creatBook(e){
    form.classList.toggle('formReveal')
    booksSection.classList.toggle('blur')

    e.preventDefault()
    let book = new Books(bookTitleName.value,bookAuthorName.value,bookPages.value,bookReaded.checked,Date.now())
    booksArray.push(book)
    if(book.readed){
        booksSection.innerHTML += `
        <div class="books w-72 gap-7 p-5 bg-teal-900 flex flex-col justify-evenly align-middle min-h-60 rounded-3xl" data-id="${book.id}">
                <p class="text-white text-xl  text-center font-semibold" id="title">"${book.title}"</p>
                <p class="text-white text-xl  text-center italic" id="author">${book.author}</p>
                <p class="text-white text-xl  text-center" id="pages">${book.page} pages</p>
                <button data-isReaded class="readedBtn">Readed</button>
                <button id="remove" class="bg-stone-900 text-white p-4 rounded-3xl text-xl " data-removeBtn>Remove</button>
            </div>
        `
    }else{
        booksSection.innerHTML += `
        <div class="books w-72 gap-7 p-5 bg-teal-900 flex flex-col justify-evenly align-middle min-h-60 rounded-3xl" data-id="${book.id}">
            <p class="text-white text-xl  text-center font-semibold" id="title">"${book.title}"</p>
            <p class="text-white text-xl  text-center italic" id="author">${book.author}</p>
            <p class="text-white text-xl  text-center" id="pages">${book.page} pages</p>
            <button data-isReaded class="unreadedBtn">Not readed yet</button>
            <button id="remove" class="bg-stone-900 text-white p-4 rounded-3xl text-xl" data-removeBtn>Remove</button>
        </div>
    `
    }
    
    let isReadedBtn = document.querySelectorAll('[data-isReaded')
    isReadedBtn.forEach(btn =>{
        btn.addEventListener('click',e=>{
            changeCheckedValue(book)
            if(book.readed){
                book.readed = false;
                btn.classList.add('unreadedBtn')
                btn.classList.remove('readedBtn')
                btn.textContent="Not readed yet"
                return
            }
            book.readed = true
            btn.classList.remove('unreadedBtn')
            btn.classList.add('readedBtn')
            btn.textContent="Readed"
        })
    })

    const removeBtns= document.querySelectorAll('[data-removeBtn]')

    removeBtns.forEach(removeBtn =>{
        removeBtn.addEventListener('click', e =>{
            let removeBtnParentElement = e.target.parentElement;
            removeFromArray(removeBtnParentElement)
            removeBtnParentElement.remove()
        })
    })

    
}
function removeFromArray(parentElement){
    let parentElementId = parentElement.dataset.id;
    let index = booksArray.findIndex(obj => obj.id === parentElementId)
    booksArray.splice(index,1)
    console.log(booksArray);
}
function changeCheckedValue(book){
    let selectedBook = document.querySelector(`[data-id="${book.id}"]`)
    let selectedBookId = selectedBook.dataset.id;
    const theBook = booksArray.filter(obj => obj.id === selectedBookId)
    if(theBook.readed) {
        theBook.readed = false 
        return
    } 
    theBook.readed = true
}
// addEvent
createBookBtn.addEventListener('click' , revealBtn)
form.addEventListener('submit', creatBook)


















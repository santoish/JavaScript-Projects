let quote = document.querySelector('.quote');
let author = document.querySelector('.author');
let btn = document.querySelector('.btn');

const url = 'https://dummyjson.com/quotes/random';

let getQuote = ()=>{
    fetch(url)
    .then((data)=> data.json())
    .then((item)=> {
        author.innerHTML = item.author;
        quote.innerHTML = item.quote;

/*         console.log(item.quote);
        console.log(item.author);  */   

    });
}
window.addEventListener('load',getQuote());
btn.addEventListener('click',getQuote);
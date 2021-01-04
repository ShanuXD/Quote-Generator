const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

//Show Loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true
}

//Hide Loading
function complete(){
    if (!loader.hidden){
        quoteContainer.hidden=false
        loader.hidden=true
    }
}

//Get Quote From Api
async function getQuote(){

    loading()

    const proxyURL = 'https://cors-anywhere.herokuapp.com/'

    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    try{

        const response = await fetch(proxyURL+apiURL)
        const data  = await response.json()
        authorText.innerText = data.quoteAuthor? data.quoteAuthor: 'Anonymous'

        //reduce font size for long quote
        if (data.quoteText.length>120){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }

        quoteText.innerText = data.quoteText

        //stop loader, show complete
        complete()

    }catch(error){
        //cuz this api sometime may not work 
        getQuote()
        console.log('Oops No Quote!!',error)
    }
}

//tweet
function tweetQuote(){
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterURL, '_blank')
}

//Event Listteners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote()
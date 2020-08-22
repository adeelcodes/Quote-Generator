const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoading() {
  if (!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// GET quote From API 

async function getQuote(){
  showLoading();
  const proxyURL = 'https://whispering-forest-37506.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  try {
    const response = await fetch(proxyURL + apiUrl);
    const data = await response.json();
    // IF author is blank, add unknown
    if( data.quoteAuthor === "" ){
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if( data.quoteText.length > 50 ){
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // Stop Loader, Show Quote
    hideLoading()

  } catch(error){
    console.log(error);
    getQuote()
  }
}

// Tweet Quote
function tweetQuote(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuote();
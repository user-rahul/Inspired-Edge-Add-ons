const getRandomQuote = async () => {
  const response = await fetch('http://quotable.io/random');
  const data = await response.json();
  const quote = data.content;
  const author = data.author;
  const authorImage = await getAuthorImage(author);


  return { quote, author, authorImage };
};

const renderQuote = (quote, author, img) => {
  const quoteElement = document.getElementById('Quote');
  const authorElement = document.getElementById('Author');
  const authorImage = document.getElementById('AuthorImage');
  quoteElement.innerHTML = quote;
  authorElement.innerHTML = author;
  authorImage.src = img;
};

const main = async () => {
  const { quote, author, authorImage } = await getRandomQuote();
  renderQuote(quote, author, authorImage);
};

const getAuthorImage = async (author) => {
  const apiKey = 'API_KEY';
  const query = encodeURIComponent(author); // Encode the author name for URL

  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
    headers: {
      Authorization: apiKey
    }
  });

  const data = await response.json();
  if (data.photos && data.photos.length > 0) {
    return data.photos[0].src.medium; // Return the URL of the first image found
  } else {
    return null; // Return null if no images found
  }
};


main();
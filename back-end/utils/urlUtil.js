const extractUserIdFromUrl = (url) => {
    const match = url.match(/user\/([^?]+)/);
    if (!match) throw new Error('Invalid Spotify URL');
    return match[1];
  };
  
  module.exports = { extractUserIdFromUrl };
  
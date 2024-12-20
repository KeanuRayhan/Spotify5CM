const axios = require('axios');
const { getAccessToken } = require('./authService');

const fetchSpotifyData = async (url) => {
  const token = await getAccessToken();
  const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const fetchUserAndTracks = async (userRequestId, userTargetId) => {
  const userRequestTracks = await getUserTracks(userRequestId);
  const userTargetTracks = await getUserTracks(userTargetId);

  return { userRequestTracks, userTargetTracks };
};

// Fetch user data from Spotify
const getUserData = async (userId) => {
  const accessToken = await getAccessToken();
  const response = await axios.get(`https://api.spotify.com/v1/users/${userId}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
  }

  const data = response.data;
  const imageUrl = data.images.length > 0 ? data.images[0].url : null; // Get first image

  return {
    images: imageUrl,
    url_profile: data.external_urls.spotify,
    user_id: data.id,
    display_name: data.display_name,
  };
};

// Fetch user playlists
const getUserPlaylists = async (userId) => {
  const accessToken = await getAccessToken();
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const headers = { 'Authorization': `Bearer ${accessToken}` };

  try {
    const response = await axios.get(url, { headers });
    return response.data.items.map((playlist) => playlist.id); // Only get playlist IDs
  } catch (error) {
    console.error('Error fetching user playlists:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch tracks from a playlist
const getPlaylistTracks = async (playlistId) => {
  const accessToken = await getAccessToken();
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const headers = { 'Authorization': `Bearer ${accessToken}` };

  try {
    const response = await axios.get(url, { headers });
    return response.data.items.map((item) => item.track.id); // Only get track IDs
  } catch (error) {
    console.error('Error fetching playlist tracks:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch unique tracks from all user playlists
const getUserTracks = async (userId) => {
  const playlistIds = await getUserPlaylists(userId);
  const trackIds = new Set();

  for (const playlistId of playlistIds) {
    const tracks = await getPlaylistTracks(playlistId);
    tracks.forEach((trackId) => trackIds.add(trackId)); // Save unique track IDs
  }

  return Array.from(trackIds); // Convert Set to Array
};

const getAudioFeatures = async (trackId) => {
  const accessToken = await getAccessToken();
  try {
      const response = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (response.status === 200) {
          return response.data;  // Mengembalikan data fitur audio jika berhasil
      } else {
          console.error("Error: Unexpected status code", response.status);
          return {};
      }
  } catch (error) {
      console.error("Error fetching audio feature:", error.message);
      return {};
  }
};

const getArtistId = async (trackId) => {
  const accessToken = await getAccessToken();
  try {
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (response.status === 200) {
          return response.data.artists[0].id; 
      } else {
          console.error("Error: Unexpected status code", response.status);
          return {};
      }
  } catch (error) {
      console.error("Error fetching artist id:", error.message);
      return {};
  }
}

const getArtist = async (artistIds) => {
  const accessToken = await getAccessToken();
  try {
    // Lakukan request untuk setiap artistId dalam array
    const artistData = await Promise.all(
      artistIds.map(async (artistId) => {
        try {
          const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
          });
          if (response.status === 200) {
            const artist_data = response.data;
            return {
              popularity: artist_data.popularity,
              followers: artist_data.followers?.total,
              url_profile: artist_data.external_urls?.spotify,
              genres: artist_data.genres?.join(", "),  
              images: artist_data.images?.[0]?.url || null,
              artist_id: artist_data.id,
              monthly_listeners: null,
              artist_name: artist_data.name,
            };
          } else {
            console.error("Error fetching artist:", response.status);
            return null; // Return null if error in fetching specific artist
          }
        } catch (error) {
          console.error("Error fetching artist:", error.message);
          return null; // Return null if there's an error for a specific artist
        }
      })
    );
    
    // Filter out null values if some artists were not found
    return artistData.filter(artist => artist !== null);
  } catch (error) {
    console.error('Error fetching artists:', error.message);
    return [];
  }
};


module.exports = {
  getUserData,
  getUserPlaylists,
  getPlaylistTracks,
  getUserTracks,
  fetchSpotifyData,
  fetchUserAndTracks,
  getAudioFeatures,
  getArtistId,
  getArtist
};

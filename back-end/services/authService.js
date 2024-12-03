const axios = require('axios');

let accessToken = null;
let accessTokenExpiry = null;  // Variabel untuk menyimpan waktu kedaluwarsa token
const clientId = '41f3d2edb9094086bdb5c8c5f940cdeb';  // Ganti dengan Client ID kamu
const clientSecret = '9abad0b84ae8478990b27cc337f1a6f5';  

const getAccessToken = async () => {
  // Jika token masih ada dan belum kadaluarsa
  const currentTime = Date.now();
  if (accessToken && accessTokenExpiry && currentTime < accessTokenExpiry) {
    return accessToken;
  }

  // Token tidak ada atau sudah kadaluarsa, ambil token baru
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    { headers: { Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}` } }
  );

  accessToken = response.data.access_token;
  accessTokenExpiry = currentTime + (response.data.expires_in * 1000);  // Simpan waktu kedaluwarsa token dalam milidetik
  return accessToken;
};

module.exports = { getAccessToken };


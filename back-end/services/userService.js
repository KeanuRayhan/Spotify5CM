const User = require('../models/User');

const saveUser = async ({ userId, displayName, urlProfile, images, genreScores }) => {
    // Try to find a user by user_id and update it, or create if it doesn't exist
    await User.findOneAndUpdate(
        { user_id: userId }, // Condition to find the user
        {
            display_name: displayName,
            url_profile: urlProfile,
            images: images,
            genre_scores: genreScores,
        },
        {
            new: true, // Return the updated document
            upsert: true, // If no document is found, create a new one
        }
    );
}

//find user by user_id dan kembalikan data user

const getUser = async (userId) => {
    const user = await User.findOne({ user_id: userId });

    if (!user) {
        // User tidak ditemukan
        return null;
    }

    // Cek apakah last_calculated_at lebih dari 3 hari yang lalu
    const lastCalculatedAt = new Date(user.last_calculated_at);
    const currentDate = new Date();
    const differenceInDays = (currentDate - lastCalculatedAt) / (1000 * 3600 * 24); // Menghitung selisih hari

    if (differenceInDays < 4) {
        // Jika lebih dari 3 hari, ambil genre_scores
        return user.genre_scores;
    } else {
        // Jika tidak lebih dari 3 hari, kembalikan null atau nilai lain yang sesuai
        return null;
    }
}


module.exports = { saveUser, getUser };

const Achievement = require('../../schemas/achievementSchema');

function get_all_achievements(user_id) {
    try {
        let user_achievements = await Achievement.findOne({ user: user_id });
    } catch(error) {

    }
}

function update_streaks_commitment() {

}
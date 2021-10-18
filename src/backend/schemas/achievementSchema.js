const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AchievementSchema = new Schema(
	{
        user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		achievements: [
            {
                streaks: {
                    longest_streak:{
                        value: {
                            type: Number,
                            default: 0
                        },
                        available: {
                            type: Boolean,
                            default: false
                        }
                    },
                    habits_with_streaks: {
                        value: {
                            type: Number,
                            default: 0
                        },
                        available: {
                            type: Boolean,
                            default: false
                        }
                    }
                },
                creature: {
                    evolution_stages: {
                        type: Number,
                        default: 1
                    },
                    highest_level: {
                        type: Number,
                        default: 1
                    },
                    cosmetics_num: {
                        type: Number,
                        default: 1
                    },
                    pets_num :{
                        type: Number,
                        default: 1
                    },
                },
                accountability: {
                    days_alive: {
                        value: {
                            type: Number,
                            default: 0
                        },
                        available: {
                            type: Boolean,
                            default: false
                        }
                    },
                    login_streak: {
                        value: {
                            type: Number,
                            default: 0
                        },
                        available: {
                            type: Boolean,
                            default: false
                        }
                    },
                    friends_number: {
                        value: {
                            type: Number,
                            default: 0
                        },
                        available: {
                            type: Boolean,
                            default: false
                        }
                    },
                    friends_helped: {
                        value: {
                            type: Number,
                            default: 0
                        },
                        available: {
                            type: Boolean,
                            default: false
                        }
                    }
                }
            }
        ]
    }
);

const achievement = mongoose.model('achievement', AchievementSchema);
module.exports = achievement;

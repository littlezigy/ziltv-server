const { faker } = require('@faker-js/faker');
const users = require('./users');
const videos = require('./videos');

const comments = [];

for(let i=0; i<30; i++) {
    const id = i+1;
    let user_id, video_id, text = faker.lorem.paragraph();

    if(i<4) {
        user_id=1, video_id=2;
    } else {
        user_id= users[faker.datatype.number(users.length-1)].id;
        video_id = videos[faker.datatype.number(videos.length-1)].id;
    }

    comments.push({
        id,
        user_id, video_id, text
    });
}

module.exports = comments;

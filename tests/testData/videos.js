const { faker } = require('@faker-js/faker');
const users = require('./users');
const videos = [];
const videoUrls = ['https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    'https://video.wixstatic.com/video/f63a61_393fea8fe49948f8b42763f023ee2c52/720p/mp4/file.mp4',
    'https://video.wixstatic.com/video/f63a61_d985dba13bb648fa9b8bc5d41b8a3078/720p/mp4/file.mp4',
    'https://video.wixstatic.com/video/f63a61_a2e2d90ec8a546e0afc9d6767aea9ba3/720p/mp4/file.mp4',
    'https://video.wixstatic.com/video/f63a61_a2e2d90ec8a546e0afc9d6767aea9ba3/720p/mp4/file.mp4'
];

const thumbnails = ['https://gateway.ipfs.io/ipfs/QmQso2itEMMDphMkS76stmJzWGQPJu49vg4vGXewrU7Ynr',
    'https://gateway.ipfs.io/ipfs/QmQaCEy56z4SMphruRnjbmoZMDRVFtxrmArnjgKCQDU1CL'
]

for(let i = 0; i < faker.datatype.number({min: 10, max:15}); i++) {
    let creator = (i < 4) ?  1 :
        users[faker.datatype.number(users.length-1)].id;

    const url = videoUrls[i] || faker.internet.url();
    const thumbnail = thumbnails[i] || faker.internet.avatar();
    console.log("thumbnail:", thumbnail, i + 1);

    videos.push({
        id: i + 1,
        url, name: faker.commerce.productName(),
        thumbnail,
        description: faker.lorem.sentence(),
        creator
    });
}

module.exports = videos;

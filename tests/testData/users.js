const bech32s = ['zil1zkrlarygylrmld7jm3g42r222mlt5y4h8uvuvt',
    'zil15v7h5xgcamdj6dah7e3968ua3kwzsprwkaxrn7',
    'zil1p8e6veje2vpgtu8k8xjrty55x47fc48ccxf70c',
    'zil1c5dj84pt7rcx5jpnevsjm90ct4mmfjjwghsyyv',
    'zil1h2s5e3t07cc4dhff54yagedzw4944g0q7el7e4',
    'zil1z2u5waw9zrscnf3jx3xwdfd9vw4pj4c5jtsd9p',
    'zil1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq9yf6pz',
    'zil1fxrj57r92djsszx42xv76cqz3uc2t60tnepxvp',
    'zil1z2u5waw9zrscnf3jx3xwdfd9vw4pj4c5jtsd9p',
]
const passwords = [
    'password123'
]
const users = []
const { faker } = require('@faker-js/faker');

bech32s.forEach((zil_bech32, i) => {
    const fname = faker.name.firstName().replace('\'', '');
    const lname = faker.name.lastName().replace('\'', '');
    let name, username;

    if(i == 0) {
        name = "First user",
        username = "first_user_on_ziltv"
    } else {
        name = fname + ' ' + lname;
        username = faker.internet.userName(fname, lname)
    }

    const password = passwords[i] || faker.internet.password();
    const email = faker.internet.exampleEmail(fname, lname);
    const links = Array(faker.datatype.number(5)).fill(1)
        .fill({
            name: faker.lorem.word(),
            url: faker.internet.url()
        });

    const bio = faker.lorem.paragraphs();
    const shortBio = faker.lorem.sentence();
    const avatar = faker.internet.avatar();

    users.push({
        id: i + 1,
        name,
        username,
        password,
        email,
        links,
        zil_bech32,
        shortBio, bio, avatar
    });
});

module.exports = users;

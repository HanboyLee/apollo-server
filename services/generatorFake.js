const faker = require('faker');
faker.locale = 'zh_CN';
const genertorUser = (gOfNum = 5) => {
    const arr = [];
    const f = faker;
    for (let i = 0; i < gOfNum; i++) {
        const user = {
            age: (Math.random() * 100 + 1).toFixed(0) * 1,
            name: `${f.name.lastName()} ${f.name.firstName()}`,
            phone: f.phone.phoneNumberFormat(),
            email: f.internet.email(f.random.alpha(3), f.random.alpha(3)),
            job: f.name.jobTitle(),
            gender: i % 2,
            address: f.address.country(),
            _thumbnail: f.image.people(),
        };

        arr.push(user);
    }
    return arr;
};

module.exports = {
    genertorUser,
};

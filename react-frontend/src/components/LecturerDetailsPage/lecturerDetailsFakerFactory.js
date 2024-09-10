
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
lecId: faker.lorem.sentence(1),
lecName: faker.lorem.sentence(1),
course: faker.lorem.sentence(1),
address: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};

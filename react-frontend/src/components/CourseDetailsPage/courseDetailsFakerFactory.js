
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
courseId: faker.lorem.sentence(1),
courseName: faker.lorem.sentence(1),
department: faker.lorem.sentence(1),
coordinator: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};

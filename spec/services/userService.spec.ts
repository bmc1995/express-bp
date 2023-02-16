import sinon from "sinon";
import { faker } from "@faker-js/faker";
import { expect } from "chai";
import UserRepository from "../../src/database/repositories/UserRepository";
import UserService from "../../src/services/userService";
import { User } from "@prisma/client";
import { suiteTeardown } from "mocha";

const uuid = faker.datatype.uuid();
const fakeUser: User = {
  age: faker.datatype.number({ max: 100 }),
  deleted: false,
  email: faker.internet.email(),
  id: uuid,
  name: faker.name.fullName(),
  title: faker.name.jobTitle(),
  role: "BASIC",
};
const fakeUser2: User = {
  age: faker.datatype.number({ max: 100 }),
  deleted: false,
  email: faker.internet.email(),
  id: uuid,
  name: faker.name.fullName(),
  title: faker.name.jobTitle(),
  role: "BASIC",
};

describe("UserService", () => {
  const stubRepo = sinon.stub(new UserRepository());
  const service = sinon.spy(new UserService(stubRepo));
  suiteTeardown(() => {
    sinon.reset();
  });
  it("#destroy returns deleted user", async () => {
    stubRepo.destroy.resolves(fakeUser);

    const returned = await service.destroy(fakeUser.id);

    expect(returned).to.eql(fakeUser);
  });
  it("#find returns found user", async () => {
    stubRepo.find.resolves(fakeUser);

    const returned = await service.findById(fakeUser.id);

    expect(returned).to.eql(fakeUser);
  });
  it("#findAll returns all users", async () => {
    stubRepo.findAll.resolves([fakeUser, fakeUser2]);

    const returned = await service.getAllUsers();

    expect(returned).to.eql([fakeUser, fakeUser2]);
  });
  it("#create returns created user", async () => {
    stubRepo.create.resolves(fakeUser);

    const returned = await service.create({
      data: {
        age: faker.datatype.number({ max: 100 }),
        email: faker.internet.email(),
        name: faker.name.fullName(),
        title: faker.name.jobTitle(),
      },
    });

    expect(returned).to.eql(fakeUser);
  });
  it("#update returns updated user", async () => {
    const updatedFakeUser = fakeUser;
    updatedFakeUser.name = "Bob Tester";
    stubRepo.update.resolves(updatedFakeUser);

    const returned = await service.updateById(fakeUser.id, {
      name: "Bob Tester",
    });

    expect(returned).to.eql(fakeUser);
  });
  it("#softDelete returns soft deleted user", async () => {
    const deletedUser: User = { ...fakeUser, deleted: true };
    stubRepo.update.resolves(deletedUser);

    const returned = await service.softDelete(fakeUser.id);

    expect(returned).to.eql(deletedUser);
  });
});

import sinon from "sinon";
import { faker } from "@faker-js/faker";
import { expect } from "chai";
import { Post } from "@prisma/client";
import PostRepository from "../../src/database/repositories/PostRepository";
import PostService from "../../src/services/postService";
import { suiteTeardown } from "mocha";

const fakePostCreate = (): Post => {
  const authorUuid = faker.datatype.uuid();
  const postUuid = faker.datatype.uuid();
  return {
    deleted: false,
    authorId: authorUuid,
    id: postUuid,
    title: faker.name.jobTitle(),
    content: faker.random.words(50),
    averageRating: 0,
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    favoritedById: null,
  };
};

describe("PostService", () => {
  const stubRepo = sinon.stub(new PostRepository());
  const service = sinon.spy(new PostService(stubRepo));
  suiteTeardown(() => {
    sinon.reset();
  });
  it("#getAllPosts returns all posts", async () => {
    const allPosts = [fakePostCreate(), fakePostCreate(), fakePostCreate()];
    stubRepo.findAll.resolves(allPosts);

    const returned = await service.getAllPosts();

    expect(returned).to.eql(allPosts);
  });

  it("#findById returns post", async () => {
    const post = fakePostCreate();
    stubRepo.find.resolves(post);

    const returned = await service.findById(post.id);

    expect(returned).to.eql(post);
  });
  it("#create returns post", async () => {
    const post = fakePostCreate();
    stubRepo.create.resolves(post);

    const returned = await service.create({
      authorId: post.authorId,
      title: post.title,
      content: post.content,
      categories: ["category1", "category2"],
    });

    expect(returned).to.eql(post);
  });
  it("#update returns post", async () => {
    const post = fakePostCreate();
    stubRepo.update.resolves(post);

    const returned = await service.update({
      authorId: post.authorId,
      postId: post.id,
      deleted: post.deleted,
      title: post.title,
      content: post.content,
      categories: [],
    });

    expect(returned).to.eql(post);
  });
  it("#destroy returns deleted post", async () => {
    const post = fakePostCreate();
    stubRepo.destroy.resolves(post);

    const returned = await service.destroy(post.id);

    expect(returned).to.eql(post);
  });
  it("#softDelete returns soft deleted post", async () => {
    const post = fakePostCreate();
    const deletedPost: Post = { ...post, deleted: true };
    stubRepo.update.resolves({ ...post, deleted: true });

    const returned = await service.softDelete(post.id);

    expect(returned).to.eql(deletedPost);
  });
});

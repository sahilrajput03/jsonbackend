const axios = require("axios");
const {post} = axios;

let initialEmptyData = {
  coffee: 10,
  tea: 20,
  market: ["beans", "mutton"],
};

const localhostUrl = "http://localhost:3000/";
const herokuUrl = "https://jsonbackendserver.herokuapp.com/";

const slug = "tinku";

const URL_IN_USE = herokuUrl + slug;

let testData = {motu: 2, patlu: 1};
let testUpdateData = {motu: 1, tinku: 1};
let resultingData = {motu: 1, patlu: 1, tinku: 1};

describe(`Post, fetch, partial-post, fetch-non-existingDb @ url '${URL_IN_USE}'.`, () => {
  test("Post", async () => {
    let {data: receivedData} = await post(URL_IN_USE, testData);
    expect(testData).toEqual(receivedData); // To equal is for  deep equality of properies of objects.
  });

  test("fetch", async () => {
    let {data: receivedData} = await post(URL_IN_USE);
    expect(receivedData).toEqual(testData);
  });

  test("partial post", async () => {
    let {data: receivedData} = await post(URL_IN_USE, {
      $partial: {
        ...testUpdateData,
      },
    });
    expect(receivedData).toEqual(resultingData);
  });

  test("fetch-non-existingDb", async () => {
    let {data: receivedData} = await post(URL_IN_USE + Math.random());
    expect(receivedData).toEqual(initialEmptyData);
  });
});

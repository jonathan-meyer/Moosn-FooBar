import pokemon from "pokemon";
import { helloWorld } from "../utility";

jest.mock("axios", () => {
  return {
    get: jest.fn((url, { params }) =>
      Promise.resolve({ data: { url, params } })
    ),
  };
});

describe("utility", () => {
  it("should call helloWorld() function without errors", async () => {
    const name = pokemon.random();
    const { data } = await helloWorld(name);

    expect(data).toStrictEqual(
      expect.objectContaining({
        params: expect.objectContaining({ hello: name }),
      })
    );
  });
});

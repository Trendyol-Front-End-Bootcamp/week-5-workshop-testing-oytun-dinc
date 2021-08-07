import UserProvider from "./UserProvider"
import axios from "axios";

jest.mock("axios");

describe("UserProvider", () => {
  const userProvider = new UserProvider();

  it("should return posts", () => {
    axios.get.mockResolvedValue({
      data: [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
      ]
    })

    expect(userProvider.getPosts()).resolves.toEqual([
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    ])
  })

  it("should return error when error occurs while fetching", async () => {
    axios.get.mockRejectedValue();

    await expect(userProvider.getPosts()).rejects.toThrow("Network Error!")
  })
})
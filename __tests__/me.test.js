const request = require("supertest");
const app = require("../index");
const axios = require("axios");

// Mock axios globally
jest.mock("axios");

describe("GET /me", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return success status and a valid JSON structure when API works", async () => {
    // Mock successful API response
    axios.get.mockResolvedValueOnce({
      data: { fact: "Cats can jump up to six times their length." },
    });

    const res = await request(app).get("/me");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("name");
    expect(res.body.user).toHaveProperty("stack");
    expect(res.body).toHaveProperty(
      "fact",
      "Cats can jump up to six times their length."
    );
    expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
  });

  it("should return fallback fact when Cat Facts API fails", async () => {
    // Simulate API failure
    axios.get.mockRejectedValueOnce(new Error("API down"));

    const res = await request(app).get("/me");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.fact).toBe(
      "Cats are awesome, even when facts are unavailable right now 😸"
    );
  });
});

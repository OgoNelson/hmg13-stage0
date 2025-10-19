const axios = require("axios");
const clean = (val) => val?.replace(/^['"]|['"]$/g, "");

const userProfileController = async (req, res) => {
  try {
    // Fetch cat fact from external API
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000, // 5 seconds timeout
    });

    // Construct response
    const data = {
      status: "success",
      user: {
        email: clean(process.env.EMAIL),
        name: clean(process.env.NAME),
        stack: clean(process.env.STACK),
      },
      timestamp: new Date().toISOString(),
      fact: response.data.fact,
    };

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Cat Fact API Error:", error.message);

    // Graceful fallback if API fails
    const fallback = {
      status: "success",
      user: {
        email: clean(process.env.EMAIL),
        name: clean(process.env.NAME),
        stack: clean(process.env.STACK),
      },
      timestamp: new Date().toISOString(),
      fact: "Cats are awesome, even when facts are unavailable right now 😸",
    };

    return res.status(200).json(fallback);
  }
};

module.exports = userProfileController;

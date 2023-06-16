const fetch = require("node-fetch");

const Authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw Error("No token");
    }

    const token = req.headers.authorization.split(" ")[1];

    const user = await fetch(
      `https://dev-vvavubejfc3hoy2m.us.auth0.com/userinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const info = await user.json();

    req.user = info;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = Authentication;

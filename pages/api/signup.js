export default async function handler(req, res) {
  if (req.method === "POST") {
    // POST request using fetch()
    const response = await fetch(`http://0.0.0.0:3131/api/auth/signup`, {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // Converting to JSON
      .then((response) => {
        return response;
      });
    return res.status(response.status).json(await response.json());
  }
}

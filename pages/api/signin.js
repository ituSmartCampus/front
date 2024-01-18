export default async function handler(req, res) {
  if (req.method === "POST") {
    // POST request using fetch()
    const response = await fetch(`http://127.0.0.1:3131/api/auth/signin`, {
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
    });
    const json = await response.json();
    if (json) return res.status(response.status).json(json);
    return res.status(401).json({ err: "Hata" });
  }
}

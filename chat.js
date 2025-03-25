
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Sadece POST desteklenir." });
  }

  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  res.status(200).json({ reply });
}

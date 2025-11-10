// Serverless proxy to your Apps Script exec URL (fixes CORS)
export async function handler(event) {
  const EXEC_URL = "https://script.google.com/macros/s/AKfycbwEAAhKZnqlIvuHa-p2Wh8FNAeC5z_fbafYNQ7ijrpxIFZuJ1y57rl64eBU5HUj3LsE5g/exec";

  try {
    const method = event.httpMethod.toUpperCase();

    if (method === "GET") {
      const qs = event.rawQuery ? "?" + event.rawQuery : "";
      const res = await fetch(EXEC_URL + qs, { method: "GET" });
      const text = await res.text();
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: text
      };
    }

    if (method === "POST") {
      const res = await fetch(EXEC_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoid preflight
        body: event.body
      });
      const text = await res.text();
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: text
      };
    }

    if (method === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: ""
      };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ ok: false, error: String(e) })
    };
  }
}

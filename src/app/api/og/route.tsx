import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>🐳</p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}

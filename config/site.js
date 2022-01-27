const site = {
  name: "DownDir",
  slogan: "Download Directory from Github",
  url: process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000",
  thumbnail: {
    src: "/downdir-1024x1024.png",
    height: "1024",
    width: "1024",
  },
  description:
    "Download directories, files and repositories (Private/Public) from Github with one click.",
};

export default site;

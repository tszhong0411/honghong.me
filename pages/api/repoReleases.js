export default async function handler(req, res) {
    const userResponse = await fetch(
        "https://api.github.com/repos/tszhong0411/honghong.me/releases"
    );
    const data = await userResponse.json();

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=1200, stale-while-revalidate=600"
    );

    return res.status(200).json(data);
}

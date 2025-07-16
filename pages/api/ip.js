export default async function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
  const data = await response.json();

  res.status(200).json({
    ip: ip,
    ülke: data.geoplugin_countryName,
    şehir: data.geoplugin_city,
    bölge: data.geoplugin_region,
    sağlayıcı: data.geoplugin_request,
  });
}

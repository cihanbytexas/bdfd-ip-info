export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: "IP adresi gerekli" });
  }

  try {
    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
    const data = await response.json();

    res.status(200).json({
      ip: data.geoplugin_request,
      country: data.geoplugin_countryName,
      city: data.geoplugin_city,
      region: data.geoplugin_region,
      timezone: data.geoplugin_timezone,
      lat: data.geoplugin_latitude,
      lon: data.geoplugin_longitude
    });
  } catch (err) {
    res.status(500).json({ error: "İstek başarısız oldu", details: err.message });
  }
}

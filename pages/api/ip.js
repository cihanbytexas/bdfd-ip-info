export default async function handler(req, res) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.connection?.remoteAddress ||
    '';

  try {
    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
    const data = await response.json();

    res.status(200).json({
      ip: data.geoplugin_request,
      country: data.geoplugin_countryName,
      city: data.geoplugin_city,
      region: data.geoplugin_region,
      latitude: data.geoplugin_latitude,
      longitude: data.geoplugin_longitude,
      timezone: data.geoplugin_timezone,
    });
  } catch (error) {
    res.status(500).json({ error: 'Veri alınamadı' });
  }
}

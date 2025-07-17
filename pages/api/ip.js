export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'IP adresi girilmedi. Örnek: ?ip=8.8.8.8' });
  }

  try {
    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
    const data = await response.json();

    if (data.geoplugin_status !== 200 && data.geoplugin_status !== 206) {
      return res.status(500).json({ error: 'API verisi alınamadı.' });
    }

    res.status(200).json({
      ip: data.geoplugin_request,
      country: data.geoplugin_countryName,
      region: data.geoplugin_regionName,
      city: data.geoplugin_city,
      latitude: data.geoplugin_latitude,
      longitude: data.geoplugin_longitude,
      timezone: data.geoplugin_timezone,
      currency: data.geoplugin_currencyCode
    });
  } catch (error) {
    res.status(500).json({ error: 'İşlem sırasında hata oluştu.', detail: error.message });
  }
}

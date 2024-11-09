export const getData = async (access_token, userid) => {
  try {
      const response = await fetch('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${access_token}`,
          },
      });

      const data = await response.json();

      const processedData = processHeartRateData(data, userid);

      return processedData;
  } catch (err) {
      console.error('Error fetching data:', err);
      return null;
  }
};

const processHeartRateData = (data, userid) => {

  if (!data || !data["activities-heart-intraday"] || !data["activities-heart-intraday"].dataset) {
      console.error("Invalid or empty data object:", data);
      return [];
  }

  const heartRateData = data["activities-heart-intraday"].dataset;

  const dateParts = data["activities-heart"][0].dateTime.split("-");
  const date = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

  const processedData = heartRateData.map((point) => {


      return {
          date: date,
          time: point.time,
          heartRate: point.value,
          userId: userid,
      };
  });

  return processedData;
};


exports.handler = async function(event) {

  try {

    const data = JSON.parse(event.body);

    // Statt SendGrid: einfache Mail über Netlify (Demo / Logging)
    console.log("NEUER BAFA ANTRAG:");
    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Daten empfangen ✅" })
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: "Fehler beim Verarbeiten"
    };
  }
};

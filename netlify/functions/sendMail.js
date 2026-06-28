const sgMail = require('@sendgrid/mail');

exports.handler = async function(event) {

  try {

    const data = JSON.parse(event.body);

    // API Key aus Netlify
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const message = `
NEUER BAFA ANTRAG

-------------------------
Maßnahme:
${data.massnahme}

-------------------------
Kunde:
${data.vorname} ${data.nachname}

E-Mail:
${data.email}

Telefon:
${data.telefon}

-------------------------
Adresse:
${data.adresse.strasse} ${data.adresse.hausnummer}
${data.adresse.plz} ${data.adresse.ort}

-------------------------
Investitionsobjekt:
${data.investAdresse.strasse} ${data.investAdresse.hausnummer}
${data.investAdresse.plz} ${data.investAdresse.ort}

-------------------------
Gebäude:
Typ: ${data.gebaeude.typ}
Baujahr: ${data.gebaeude.baujahr}

Wohneinheiten:
${data.gebaeude.wohneinheiten}

Betroffene WE:
${data.gebaeude.betroffen}
`;

    await sgMail.send({
      to: "michaelfitzner@outlook.com",
      from: "noreply@deine-domain.de",
      subject: "Neuer BAFA Kunde",
      text: message
    });

    return {
      statusCode: 200,
      body: "Email erfolgreich gesendet"
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: "Fehler beim Senden"
    };
  }
};

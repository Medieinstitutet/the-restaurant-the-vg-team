import HappyDumplingKarta from '../graphics/HappyDumplingKarta.png';

export const Contact = () => {
  return (
    <>
      <h2>Kontakt</h2>
      <h3>Öppettider</h3>
      <p>Måndag - Fredag: 11:00 - 22:00</p>
      <p>Lördag - Söndag: 12:00 - 22:00</p>

      <br />
      
      <p>Happy Dumpling</p>
      <p>Malmögatan 8</p>
      <p>54321 Malmö</p>
      <p>Telefon: 040-345 67 89</p>
      <p>Email: <a href="mailto:happy@dumpling.se">happy@dumpling.se</a></p>
      

      <div>
        <img src={HappyDumplingKarta} alt="Map" className="border-8 border-yellow-400 min-h-80" />
      </div>
    </>
  );};


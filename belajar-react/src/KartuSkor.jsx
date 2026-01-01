// Ini adalah komponen anak
function KartuSkor(props) {
  return (
    <div style={{ border: '2px solid gray', padding: '20px', borderRadius: '10px', marginBottom: '10px' }}>
      <h3>Pemain: {props.nama}</h3>
      <p>Poin saat ini: {props.poin}</p>
    </div>
  );
}

export default KartuSkor;
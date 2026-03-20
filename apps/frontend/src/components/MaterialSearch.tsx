interface MaterialSearchProps {
  referenciaBusqueda: string;
  setReferenciaBusqueda: (value: string) => void;
  agregarMaterial: () => void;
}

export default function MaterialSearch({
  referenciaBusqueda,
  setReferenciaBusqueda,
  agregarMaterial
}: MaterialSearchProps) {
  return (
    <>
      <h3>Materiales</h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Referencia"
          value={referenciaBusqueda}
          onChange={(e) => setReferenciaBusqueda(e.target.value)}
        />

        <button onClick={agregarMaterial}>Añadir material</button>
      </div>
    </>
  );
}
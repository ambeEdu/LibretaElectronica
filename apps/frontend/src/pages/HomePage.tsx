import { useState } from "react";

interface MaterialLine {
  referencia: string;
  descripcion: string;
  cantidad: number;
  stockActual: number;
  familia?: string;
}

export default function HomePage() {

  const [numeroSerie,setNumeroSerie] = useState("")
  const [hospital,setHospital] = useState("")
  const [estado,setEstado] = useState("")
  const [modelo,setModelo] = useState("")

  const [tecnicoNombre,setTecnicoNombre] = useState("")
  //const [tecnicoEmail,setTecnicoEmail] = useState("")
  const [fecha,setFecha] = useState("")

  const [tipoIntervencion,setTipoIntervencion] = useState("")
  const [numeroInventario,setNumeroInventario] = useState("")
  const [numeroParte,setNumeroParte] = useState("")

  const [descripcionError,setDescripcionError] = useState("")
  const [observaciones,setObservaciones] = useState("")
  const [seguridadElectrica,setSeguridadElectrica] = useState("")

  const [referenciaBusqueda,setReferenciaBusqueda] = useState("")
  const [materiales,setMateriales] = useState<MaterialLine[]>([])

  async function buscarEquipo(){

    if(!numeroSerie) return

    const res = await fetch(`/api/equipo?serie=${encodeURIComponent(numeroSerie)}`)
    const data = await res.json()

    if(data.found){

      setHospital(data.hospital || "")
      setEstado(data.estado || "")
      setModelo(data.modelo || "")

    }else{

      setHospital("")
      setEstado("")
      setModelo("")
      alert("Equipo no encontrado")

    }

  }

  async function agregarMaterial(){

    if(!referenciaBusqueda) return

    const res = await fetch(`/api/material?referencia=${encodeURIComponent(referenciaBusqueda)}`)
    const data = await res.json()

    if(!data.found){

      alert("Referencia no encontrada")
      return

    }

    const existente = materiales.find(m=>m.referencia === data.referencia)

    if(existente){

      setMateriales(prev =>
        prev.map(m =>
          m.referencia === data.referencia
          ? {...m,cantidad:m.cantidad + 1}
          : m
        )
      )

    }else{

      setMateriales(prev => [

        ...prev,

        {
          referencia:data.referencia,
          descripcion:data.descripcion,
          cantidad:1,
          stockActual:data.stockActual,
          familia:data.familia
        }

      ])

    }

    setReferenciaBusqueda("")

  }

  function actualizarCantidad(referencia:string,cantidad:number){

    setMateriales(prev =>
      prev.map(m =>
        m.referencia === referencia
        ? {...m,cantidad}
        : m
      )
    )

  }

  function eliminarMaterial(referencia:string){

    setMateriales(prev => prev.filter(m=>m.referencia !== referencia))

  }

  async function guardarIntervencion(){

    const hoy = new Date()

    const payload = {

      //tecnicoEmail,
      tecnicoNombre,

      fecha,

      tipoIntervencion,

      numeroSerie,

      hospital,

      estado,

      numeroInventario,

      numeroParte,

      modelo,

      descripcionError,

      observaciones,

      seguridadElectrica,

      materialesJson: materiales,

      mes: hoy.getMonth()+1,

      anio: hoy.getFullYear(),

      archivado:false,

      fechaArchivado:null

    }

    const res = await fetch("/api/intervencion",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body: JSON.stringify(payload)

    })

    if(res.ok){

      alert("Intervención guardada")

      setMateriales([])
      setNumeroSerie("")

    }else{

      alert("Error guardando intervención")

    }

  }

  return(

    <div style={{padding:30,fontFamily:"Arial"}}>

      <h2>Libreta electrónica</h2>

      <h3>Cabecera</h3>

      <div style={{display:"grid",gridTemplateColumns:"200px 300px",gap:10,marginBottom:30}}>

        <label>Nº Serie</label>
        <input
          value={numeroSerie}
          onChange={e=>setNumeroSerie(e.target.value)}
          onBlur={buscarEquipo}
        />

        <label>Hospital</label>
        <input value={hospital} readOnly />

        <label>Estado</label>
        <input value={estado} readOnly />

        <label>Modelo</label>
        <input value={modelo} readOnly />

        <label>Técnico</label>
        <input
          value={tecnicoNombre}
          onChange={e=>setTecnicoNombre(e.target.value)}
        />

        {/* <label>Email técnico<label>} */}
        {/* <input */}
          {/* value={tecnicoEmail} */}
          {/* onChange={e=>setTecnicoEmail(e.target.value)} */}
        {/* /> */}

        <label>Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={e=>setFecha(e.target.value)}
        />

        <label>Tipo intervención</label>
        <input
          value={tipoIntervencion}
          onChange={e=>setTipoIntervencion(e.target.value)}
        />

        <label>Nº Inventario</label>
        <input
          value={numeroInventario}
          onChange={e=>setNumeroInventario(e.target.value)}
        />

        <label>Nº Parte</label>
        <input
          value={numeroParte}
          onChange={e=>setNumeroParte(e.target.value)}
        />

      </div>

      <h3>Materiales</h3>

      <div style={{display:"flex",gap:10,marginBottom:20}}>

        <input
          placeholder="Referencia"
          value={referenciaBusqueda}
          onChange={e=>setReferenciaBusqueda(e.target.value)}
        />

        <button onClick={agregarMaterial}>
          Añadir material
        </button>

      </div>

      <table style={{width:"100%",borderCollapse:"collapse"}}>

        <thead>

          <tr>

            <th style={thStyle}>Referencia</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Cantidad</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Familia</th>
            <th style={thStyle}></th>

          </tr>

        </thead>

        <tbody>

          {materiales.map(m=>(

            <tr
              key={m.referencia}
              style={{
                backgroundColor:m.stockActual === 0 ? "#ffe5e5":"white",
                color:m.stockActual === 0 ? "#b00020":"black"
              }}
            >

              <td style={tdStyle}>{m.referencia}</td>

              <td style={tdStyle}>{m.descripcion}</td>

              <td style={tdStyle}>

                <input
                  type="number"
                  min={1}
                  value={m.cantidad}
                  onChange={e=>actualizarCantidad(m.referencia,Number(e.target.value))}
                  style={{width:70}}
                />

              </td>

              <td style={tdStyle}>{m.stockActual}</td>

              <td style={tdStyle}>{m.familia}</td>

              <td style={tdStyle}>

                <button onClick={()=>eliminarMaterial(m.referencia)}>
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <h3 style={{marginTop:40}}>Información intervención</h3>

      <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:600}}>

        <label>Descripción error</label>
        <textarea
          value={descripcionError}
          onChange={e=>setDescripcionError(e.target.value)}
        />

        <label>Observaciones</label>
        <textarea
          value={observaciones}
          onChange={e=>setObservaciones(e.target.value)}
        />

        <label>Seguridad eléctrica</label>
        <input
          value={seguridadElectrica}
          onChange={e=>setSeguridadElectrica(e.target.value)}
        />

      </div>

      <button
        onClick={guardarIntervencion}
        style={{marginTop:30}}
      >

        Guardar intervención

      </button>

    </div>

  )

}

const thStyle:React.CSSProperties = {
  border:"1px solid #ccc",
  padding:"8px",
  background:"#f2f2f2",
  textAlign:"left"
}

const tdStyle:React.CSSProperties = {
  border:"1px solid #ccc",
  padding:"8px"
}
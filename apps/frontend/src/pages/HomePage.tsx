import { useMemo, useState } from "react";
import type { InterventionDetail, InterventionRequest } from "@ambe/shared";
import InterventionForm from "../components/InterventionForm";
import InterventionsList from "../components/InterventionsList";
import { useInterventions } from "../hooks/useInterventions";

export default function HomePage() {
  const [numeroSerieFilter, setNumeroSerieFilter] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [editing, setEditing] = useState<InterventionDetail | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [readOnlyEdit, setReadOnlyEdit] = useState(false);

  const filters = useMemo(
    () => ({ numeroSerie: numeroSerieFilter || undefined, from: fromFilter || undefined, to: toFilter || undefined }),
    [numeroSerieFilter, fromFilter, toFilter]
  );

  const { items, loading, error, create, update } = useInterventions(filters);

  async function openEditor(id: string) {
    const selected = items.find((item) => item.id === id) ?? null;
    setEditing(selected);
    setReadOnlyEdit(false);
    setFeedback(null);
  }

  async function handleCreate(payload: InterventionRequest) {
    await create(payload);
    setFeedback("Intervención guardada correctamente.");
  }

  async function handleUpdate(payload: InterventionRequest) {
    if (!editing) return;

    try {
      await update(editing.id, payload);
      setEditing(null);
      setFeedback("Intervención actualizada correctamente.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo actualizar";
      if (message.toLowerCase().includes("403") || message.toLowerCase().includes("permis")) {
        setReadOnlyEdit(true);
        setFeedback("No tienes permisos de edición en SharePoint. Se muestra en modo solo lectura.");
        return;
      }
      setFeedback(`Error al actualizar: ${message}`);
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>Libreta electrónica</h2>

      {feedback && <p style={{ color: feedback.startsWith("Error") ? "red" : "green" }}>{feedback}</p>}

      <InterventionForm mode="create" submitLabel="Guardar intervención" onSubmit={handleCreate} />

      <InterventionsList
        items={items}
        loading={loading}
        error={error}
        numeroSerie={numeroSerieFilter}
        from={fromFilter}
        to={toFilter}
        onNumeroSerieChange={setNumeroSerieFilter}
        onFromChange={setFromFilter}
        onToChange={setToFilter}
        onEdit={(id) => void openEditor(id)}
      />

      {editing && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: "2px solid #ccc" }}>
          <h3>Editar intervención #{editing.id}</h3>
          <InterventionForm
            mode="edit"
            initialData={editing}
            onSubmit={handleUpdate}
            submitLabel={readOnlyEdit ? "Sin permisos de edición" : "Guardar cambios"}
            readOnly={readOnlyEdit}
          />
        </div>
      )}
    </div>
  );
}

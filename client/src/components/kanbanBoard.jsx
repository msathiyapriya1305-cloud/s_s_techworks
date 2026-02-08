import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

export default function KanbanBoard({
  projects,
  onStatusChange,
}) {
  const pending = projects.filter(
    (p) => p.status === "Pending"
  );

  const completed = projects.filter(
    (p) => p.status === "Completed"
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const projectId = active.id;
    const newStatus = over.id;

    onStatusChange(projectId, newStatus);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-2 gap-6 mt-6">

        <Column
          id="Pending"
          title="Pending"
          items={pending}
          variant="pending"
        />

        <Column
          id="Completed"
          title="Completed"
          items={completed}
          variant="completed"
        />

      </div>
    </DndContext>
  );
}

/* ================= COLUMN ================= */

function Column({ id, title, items, variant }) {
  const { setNodeRef } = useDroppable({ id });

  const styles =
    variant === "pending"
      ? {
          container:
            "bg-yellow-50 border border-yellow-200",
          title: "text-yellow-800",
        }
      : {
          container:
            "bg-purple-50 border border-purple-200",
          title: "text-purple-800",
        };

  return (
    <div
      ref={setNodeRef}
      className={`${styles.container} p-4 rounded-xl shadow-sm max-h-80 overflow-y-auto`}
    >
      <h3
        className={`font-semibold mb-3 ${styles.title}`}
      >
        {title}
      </h3>

      {items.length === 0 && (
        <p className="text-sm text-gray-400">
          No projects
        </p>
      )}

      {items.map((p) => (
        <Card key={p._id} project={p} />
      ))}
    </div>
  );
}

/* ================= CARD ================= */

function Card({ project }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: project._id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 mb-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-grab active:cursor-grabbing"
    >
      <p className="font-medium text-gray-800">
        {project.projectType}
      </p>
      <p className="text-xs text-gray-500">
        {project.name}
      </p>
    </div>
  );
}

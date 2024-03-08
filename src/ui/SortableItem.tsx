import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TaskType } from "../hooks/types";

function SortableItem({
  task,
  onDeleteTask,
}: {
  task: TaskType;
  onDeleteTask: (
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: number,
  ) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const { content, completed } = task;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mt-2 w-full"
    >
      <div className="mb-4 flex flex-row  items-center justify-between border-t-4 border-rose-300 bg-white p-4 text-rose-950">
        <p className="break-all">{content}</p>
        <div className="flex flex-row space-x-3">
          <div> {completed ? "🐾" : ""}</div>
          <button
            className="w-3 justify-end"
            onClick={(e) => onDeleteTask(e, task.id)}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default SortableItem;

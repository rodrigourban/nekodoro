import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../ui/SortableItem";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useEffect, useState } from "react";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

function TaskList() {
  const { taskList, addTask, moveTasks, deleteTask } = useGlobalContext();

  const [inputTask, setInputTask] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      moveTasks({
        active,
        over,
      });
    }
  }

  function handleDeleteTask(
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: number,
  ) {
    e.preventDefault();
    deleteTask(taskId);
  }

  function handleAddTask() {
    addTask(inputTask);
    setInputTask("");
  }

  useEffect(
    function () {
      function handleEnterPressed(e: KeyboardEvent) {
        if (e.key === "Enter" && inputTask.length > 3) {
          handleAddTask();
        }
      }
      document.addEventListener("keypress", handleEnterPressed);
      return () => {
        document.removeEventListener("keypress", handleEnterPressed);
      };
    },
    [inputTask, handleAddTask],
  );

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-96 w-80 flex-col items-start p-5 md:h-96 md:w-96">
        <div className="h-1/4 w-full">
          <h1 className="text-lg font-bold">Today's to-do list! 🐱‍🏍</h1>

          <div className="flex w-full flex-col">
            <label htmlFor="mainCycle" className="mt-2 text-sm font-semibold">
              💭 Type today's tasks...
            </label>
            <input
              type="text"
              name="newTask"
              id="newTask"
              maxLength={100}
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
              className="mt-1 h-8 rounded-full px-3 accent-rose-200 focus:outline-none focus:ring focus:ring-rose-400 focus:ring-offset-1"
            />
          </div>
        </div>

        <div className="mt-3 h-96 w-full overflow-auto">
          <SortableContext
            items={taskList}
            strategy={verticalListSortingStrategy}
          >
            {taskList.map((task) => (
              <SortableItem
                key={task.content}
                task={task}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}

export default TaskList;

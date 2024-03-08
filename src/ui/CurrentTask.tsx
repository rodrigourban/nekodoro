import { useGlobalContext } from "../hooks/useGlobalContext";

function CurrentTask() {
  const { taskList, currentTaskId, completeTask } = useGlobalContext();

  const inProgressTaskList = taskList.filter((task) => task.completed !== true);

  const currentTask = inProgressTaskList.at(currentTaskId);

  return (
    <div className="mb-5 mt-2 flex flex-col ">
      {currentTask && (
        <div className="mt-2 flex flex-row items-center justify-between space-x-2  rounded-full border-2 border-rose-200 p-5">
          <p className="text-md max-w-80 break-words">{currentTask?.content}</p>
          <button onClick={() => completeTask(currentTask.id)} className="">
            🐾 Done
          </button>
        </div>
      )}
    </div>
  );
}

export default CurrentTask;

import Modal from "./Modal";
import TaskList from "../features/TaskList";

function TaskListModal() {
  return (
    <div className="mt-3 flex justify-start gap-2 align-middle">
      <Modal>
        <Modal.Open opens="task-list">
          <button className="group relative text-xl font-semibold dark:text-rose-50">
            Open To-do list 📄
            <span className="absolute -bottom-1 left-0 h-1 w-0 bg-black transition-all duration-300 group-hover:w-full dark:bg-rose-50"></span>
          </button>
        </Modal.Open>

        <Modal.Window name="task-list">
          <TaskList />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default TaskListModal;

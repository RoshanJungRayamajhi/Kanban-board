import  { useState } from "react";
import { Id, Task } from "../types";
import Trashicon from "../icons/Trashicon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}
const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsover, setmouseIsover] = useState(false);
  const [editMode, seteditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

 
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    seteditMode((prev) => !prev);
    setmouseIsover(false);
  };

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="
   bg-[#0D1117] text-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-md
   hover:ring-2 hover:ring-inset hover:ring-rose-900
   cursor-grab
   relative
   "
      >
        <textarea
          value={task.content}
          autoFocus
          placeholder="task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleEditMode();
            }
          }}
          onChange={(event) => {
            updateTask(task.id, event?.target.value);
          }}
          className="
      h-[90%]
      w-full resize-none border-none rounded bg-transparent
      text-white focus:outline-none
      
      
      "
        ></textarea>
      </div>
    );
  }

  if(isDragging){
     return (
      <div ref={setNodeRef} style={style}
       className=" bg-[#0D1117] text-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-md
        opacity-30
        border-rose-500
        border-[2px]
     cursor-grab
     relative"
      >
      Dragging task
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        toggleEditMode();
      }}
      onMouseEnter={() => {
        setmouseIsover(true);
      }}
      onMouseLeave={() => {
        setmouseIsover(false);
      }}
      className="
     bg-[#0D1117] text-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-md
     hover:ring-2 hover:ring-inset hover:ring-rose-900 
     cursor-grab
     relative
     "
    >
      <p className=" my-auto  h-[90%]  overflow-y-auto oveflow-x-hidden whitespace-normal">
        {" "}
        {task.content}
      </p>

      {mouseIsover && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white absolute right-4 top-1/2 
       opacity-60
       hover:opacity-100 
      -translate-y-1/2"
        >
          <Trashicon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;

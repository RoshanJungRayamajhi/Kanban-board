import React, { useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import Plusicon from "../icons/Plusicon";
import Trashicon from "../icons/Trashicon";
import {
  SortableContext,
  useSortable,

} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (id: Id) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const ColumnsContainer = (props: Props) => {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;
  const [editMode, seteditMode] = useState(false);
  const taskId = useMemo(() => {
    return tasks && tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" relative opacity-35 border-red-500 border-2
        bg-[#161C22] w-[25vw] h-[65vh]  max-h-[65 vh] rounded-md  flex flex-col px-1 py-4"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" select-none cursor-grab relative bg-[#161C22] w-[25vw] h-[65vh]  max-h-[65 vh] rounded-md  flex flex-col overflow-hidden"
    >
      {/* column ko name */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          seteditMode(true);
        }}
        className="columntitle w-full  cursor-grab px-2 py-2 flex items-center justify-between gap-4 "
      >
        <h4 className=" w-[50%] font-medium text-xl">
          {editMode ? (
            <input
              className="  border-[1px]  text-white bg-[#161C22] outline-none"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                seteditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                seteditMode(false);
              }}
            />
          ) : (
            column.title
          )}
        </h4>
        <button onClick={() => deleteColumn(column.id)}>
          <Trashicon />
        </button>
      </div>

      {/* column task container */}

      <div className=" h-[75%] flex  flex-col gap-4  overflow-x-hidden overflow-y-auto bg-[#161C22]">
        <SortableContext items={taskId}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* column footer */}
      <div
        onClick={() => {
          createTask(column.id);
        }}
        className=" w-full  absolute bottom-3 px-2 py-2 flex items-center gap-4 cursor-pointer"
      >
        <Plusicon />
        <h4 className=" font-medium text-xl">Add task</h4>
      </div>
    </div>
  );
};

export default ColumnsContainer;

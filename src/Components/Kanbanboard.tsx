import  { useEffect, useMemo, useState } from "react";
import Plusicon from "../icons/Plusicon";
import { Column, Id, Task } from "../types";
import ColumnsContainer from "./ColumnsContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { defaultColumns, defaultTasks } from "../Demodata/tasksandcolumn";

const Kanbanboard = () => {
  const [column, setcolumn] = useState<Column[]>(()=>{
    const savedColumns = localStorage.getItem("todocolumn");
    return savedColumns ? JSON.parse(savedColumns) : defaultColumns;
  });
  const [activeColumn, setactiveColumn] = useState<Column | null>(null);
  const [ActiveTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, settasks] = useState<Task[]>(()=>{
    const savedTasks = localStorage.getItem("todotask");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  const columnsId = useMemo(() => column.map((col) => col.id), [column]);
  // (column)
  function CreatenewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${column.length + 1}`,
    };

    setcolumn([...column, columnToAdd]);
  }

  const DeleteColumn = (id: Id) => {
    const filteredColumns = column.filter((col) => col.id !== id);
    setcolumn(filteredColumns);
    const newTasks = tasks.filter((t) => t.columnId !== id);

    settasks(newTasks);
  };

  const updatecolumn = (id: Id, title: string) => {
    const newcolumn = column.map((col) => {
      if (col.id !== id) {
        return col;
      }
      return { ...col, title };
    });
    setcolumn(newcolumn);
  };

  const createtask = (id: Id) => {
    const tasktoAdd: Task = {
      id: generateId(),
      columnId: id,
      content: `Task ${tasks.length + 1}`,
    };
    settasks([...tasks, tasktoAdd]);
  };

  const deletetask = (id: Id) => {
    const newtask = tasks.filter((task) => task.id !== id);
    settasks(newtask);
  };

  const updatetask = (id: Id, content: string) => {
    const newtasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }
      return { ...task, content };
    });
    settasks(newtasks);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  // jaba pani drag garxam taba yo jalxa
  const ondragstart = (event: DragStartEvent) => {
    // ("ondragstart", event.active.data.current.column);
    if (event.active.data.current?.type === "Column") {
      setactiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  // Drag end garauda array ko index change garauna paryo
  const ondragend = (event: DragEndEvent) => {
    setactiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    setcolumn((column) => {
      const activeColumnIndex = column.findIndex(
        (column) => column.id === activeId
      );
      const overColumnIndex = column.findIndex(
        (column) => column.id === overId
      );
      return arrayMove(column, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    // in dropping the task over another task
    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      settasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        //yesla k garxa vanda different collumn ma halna madhata garxa
        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // dropping the task over the another column
    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      settasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 300,
      },
    })
  );

  useEffect(() => {
    console.log(column)
    localStorage.setItem("todotask",JSON.stringify(tasks))
    localStorage.setItem("todocolumn",JSON.stringify(column))
  //  tasks.length >0 ? localStorage.setItem("todotask",JSON.stringify(tasks)) : localStorage.setItem("todotask",JSON.stringify(defaultTasks));
  //  column.length >0 ? localStorage.setItem("todocolumn",JSON.stringify(column)) : localStorage.setItem("todocolumn",JSON.stringify(defaultColumns));
   
  }, [column,tasks])
  

  return (
    <div className=" min-h-screen w-full bg-black m-auto overflow-x-auto overflow-y-hidden p-[10vh] text-white">
      <DndContext
        sensors={sensors}
        onDragStart={ondragstart}
        onDragEnd={ondragend}
        onDragOver={onDragOver}
      >
        <div className=" m-auto flex gap-8 ">
          <div className=" flex items-start gap-8 ">
            <SortableContext items={columnsId}>
              {column.map((col, index) => (
                <ColumnsContainer
                  key={index}
                  column={col}
                  tasks={tasks.filter((task) => task.columnId === col?.id)}
                  deleteColumn={DeleteColumn}
                  updateColumn={updatecolumn}
                  createTask={createtask}
                  deleteTask={deletetask}
                  updateTask={updatetask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              CreatenewColumn();
            }}
            className=" cursor-pointer px-2 py-3 border-2 border-zinc-500 rounded-lg flex gap-8 h-fit whitespace-nowrap "
          >
            <Plusicon />
            Add column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnsContainer
                deleteColumn={DeleteColumn}
                column={activeColumn}
                updateColumn={updatecolumn}
                createTask={createtask}
                deleteTask={deletetask}
                updateTask={updatetask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {ActiveTask && (
              <TaskCard
                deleteTask={deletetask}
                updateTask={updatetask}
                task={ActiveTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Kanbanboard;

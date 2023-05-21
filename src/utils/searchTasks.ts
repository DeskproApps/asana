import toLower from "lodash/toLower";
import { Task } from "../services/asana/types";

const searchTasks = (search: string, tasks: Task[]): Task[] => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  if (!search) {
    return tasks;
  }

  return tasks.filter(({ name }) => toLower(name).includes(toLower(search)));
};

export { searchTasks };

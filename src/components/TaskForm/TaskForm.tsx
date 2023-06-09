import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@deskpro/deskpro-ui";
import { Stack, LoadingSpinner } from "@deskpro/app-sdk";
import { useFormDeps } from "./hooks";
import {
  getInitValues,
  validationSchema,
  getStatusOptions,
} from "./utils";
import { DateInput, Button, Label, Select, TextArea } from "../common";
import { ErrorBlock } from "../Error";
import type { FC } from "react";
import type { Workspace } from "../../services/asana/types";
import type { Props, FormValidationSchema } from "./types";

const TaskForm: FC<Props> = ({ onSubmit, onCancel, isEditMode, error, task }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(task),
    resolver: zodResolver(validationSchema),
  });
  const {
    isLoading,
    tagOptions,
    userOptions,
    projectOptions,
    workspaceOptions,
  } = useFormDeps(watch("workspace"));

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="workspace" label="Workspace" required>
        <Select<Workspace["gid"]>
          id="workspace"
          value={watch("workspace")}
          showInternalSearch
          options={workspaceOptions}
          noFoundText="No workspace(s) found"
          error={has(errors, ["workspace", "message"])}
          onChange={(option) => setValue("workspace", option.value)}
        />
      </Label>

      <Label htmlFor="project" label="Project">
        <Select
          id="project"
          disabled={isEditMode}
          value={watch("project")}
          showInternalSearch
          options={projectOptions}
          noFoundText="No project(s) found"
          error={has(errors, ["project", "message"])}
          onChange={(option) => setValue("project", option.value)}
        />
      </Label>

      <Label htmlFor="name" label="Task name" required>
        <Input
          id="name"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["name", "message"])}
          value={watch("name")}
          {...register("name")}
        />
      </Label>

      <Label htmlFor="description" label="Description">
        <TextArea
          variant="inline"
          id="description"
          minHeight="auto"
          placeholder="Enter value"
          value={watch("description")}
          error={has(errors, ["description", "message"])}
          {...register("description")}
        />
      </Label>

      <Label htmlFor="status" label="Status">
        <Select
          id="status"
          value={watch("status")}
          showInternalSearch
          options={getStatusOptions()}
          error={has(errors, ["status", "message"])}
          onChange={(option) => setValue("status", option.value)}
        />
      </Label>

      <Label htmlFor="assignee" label="Assignee">
        <Select
          id="assignee"
          value={watch("assignee")}
          showInternalSearch
          options={userOptions}
          error={has(errors, ["assignee", "message"])}
          onChange={(option) => setValue("assignee", option.value)}
        />
      </Label>

      <Label htmlFor="dueDate" label="Due date">
        <DateInput
          id="dueDate"
          placeholder="DD/MM/YYYY"
          value={watch("dueDate") as Date}
          error={has(errors, ["dueDate", "message"])}
          onChange={(date) => setValue("dueDate", date[0])}
        />
      </Label>

      <Label htmlFor="tags" label="Tags">
        <Select
          id="tags"
          disabled={isEditMode}
          value={watch("tags")}
          showInternalSearch
          options={tagOptions}
          error={has(errors, ["tags", "message"])}
          closeOnSelect={false}
          onChange={(o) => {
            const tags = watch("tags");

            if (o.value) {
              const selectedTags = Array.isArray(tags) ? tags : [];
              const newValue = selectedTags.includes(o.value)
                ? selectedTags.filter((tag) => tag !== o.value)
                : [...selectedTags, o.value];

              setValue("tags", newValue);
            }
          }}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text={isEditMode ? "Save" : "Create"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        {isEditMode && onCancel && (
          <Button type="button" text="Cancel" intent="tertiary" onClick={onCancel}/>
        )}
      </Stack>
    </form>
  );
};

export { TaskForm };

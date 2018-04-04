defmodule TaskTrackerWeb.TaskView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.TaskView
  alias TaskTrackerWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      time: task.time,
      description: task.description,
      complete: task.complete,
      assigned_to: task.assigned_to,
      updated_at: task.updated_at,
      user: render_one(task.user, UserView, "user.json"),
    }
  end


end

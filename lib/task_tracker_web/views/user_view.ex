defmodule TaskTrackerWeb.UserView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
#      password_hash: user.password_hash,
#      pw_tries: user.pw_tries,
#      pw_last_try: user.pw_last_try
    }
  end
end

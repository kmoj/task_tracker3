defmodule TaskTrackerWeb.TokenView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.TokenView

  def render("token.json", %{user: user, token: token}) do
    %{
        user_id: user.id,
        username: user.username,
        token: token,
    }
  end
end
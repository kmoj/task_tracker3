defmodule TaskTrackerWeb.TokenController do
    use TaskTrackerWeb, :controller

    alias TaskTracker.Accounts
    alias TaskTracker.Accounts.User

    action_fallback TaskTrackerWeb.FallbackController

    def create(conn, %{"username" => username, "password" => password}) do
      IO.puts("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      IO.inspect(Accounts.get_user_by_credential(username, password))
      case Accounts.get_user_by_credential(username, password) do
        {:ok, %User{} = user} ->
          IO.puts("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
          conn
          |> put_status(:created)
          |> render("token.json", user: user, token: Phoenix.Token.sign(conn, "auth token", username))
        {:error, _} ->
          IO.puts("AAAAAAAAAAAAABBBBBBBBBBBBBBB")
          conn
          |> put_status(:created)
          |> render("token.json", user: %{username: "", id: ""}, token: "")
      end
    end

  end
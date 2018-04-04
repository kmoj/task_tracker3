defmodule TaskTrackerWeb.Router do
  use TaskTrackerWeb, :router

  pipeline :browser do
    import TaskTrackerWeb.Plugs
    plug :accepts, ["html"]
    plug :fetch_session
    plug :get_current_user
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/profile", PageController, :index
    get "/users", PageController, :index
    get "/users/:user_id", PageController, :index
    get "/mytasks", PageController, :index
    get "/taskassignedbyme", PageController, :index
    get "/taskDetails/:id", PageController, :index
    get "/register", PageController, :index

  end

  # Other scopes may use custom stacks.
   scope "/api/v1", TaskTrackerWeb do
     pipe_through :api
     post "/token", TokenController, :create
     resources "/users", UserController, except: [:new, :edit]
     resources "/tasks", TaskController, except: [:new, :edit]
   end
end

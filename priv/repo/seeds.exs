# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker.Repo.insert!(%TaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias TaskTracker.Repo
  alias TaskTracker.Accounts.User
  alias TaskTracker.Job.Task

  def run do
    Repo.delete_all(User)
    password = Comeonin.Pbkdf2.hashpwsalt("a")

    a = Repo.insert!(%User{ username: "alice", password_hash:  password})
    b = Repo.insert!(%User{ username: "bob", password_hash:  password})
    c = Repo.insert!(%User{ username: "carol", password_hash:  password})
    d = Repo.insert!(%User{ username: "dave", password_hash:  password})

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, title: "From Alice", description: "Alice to Alice", assigned_to: "alice" })
    Repo.insert!(%Task{ user_id: a.id, title: "From Alice", description: "Alice to Bob", assigned_to: "bob" })
    Repo.insert!(%Task{ user_id: b.id, title: "From Bob", description: "Bob to Bob", assigned_to: "bob" })
    Repo.insert!(%Task{ user_id: b.id, title: "From Bob", description: "Bob to Alice", assigned_to: "alice" })
    Repo.insert!(%Task{ user_id: a.id, title: "From Alice", description: "Alice to Carol", assigned_to: "carol" })
  end
end

Seeds.run
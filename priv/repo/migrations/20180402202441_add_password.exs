defmodule TaskTracker.Repo.Migrations.AddPassword do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :password_hash, :string, null: false
      add :pw_tries, :integer, null: false, default: 0
      add :pw_last_try, :utc_datetime
    end
  end
end

defmodule TaskTracker.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, null: false
#      add :password_hash, :string
#      add :pw_tries, :integer, null: false, default: 0
#      add :pw_last_try, :utc_datetime

      timestamps()
    end

  end
end

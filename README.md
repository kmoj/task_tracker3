# Development Decisions
Login:
  1.username and password fields are required.
 
Register:
  1.username, password and confirm password fields are required.
  2.password should have at least 8 characters.
  3.username should be unique to other existing users' username.
 
 Assign New Task:
   1.tile, assignee and description fields are required.
   2.no need to specify time and completeness flieds. They are 
    defult to 0 and false at insertion.
  
 My Task list:
   1. one colume for tasks assigned to the login user,
     another one for tasks assigned by the login user.
   2. tasks are sort by completeness and last updated time.
   3. finished task have background color of green.
   4. unfinished task have background color of yellow.
  
  Task Details:
   1. clicks the edit button will enable the user to edit fields
      that he/she has permisson to.
   2. if the login user is the task's assigner, the user can edit
      title, assignee and description fields.
      if the login user is the task's assignee, the user can edit
      session time spent and completeness fields.
   3. if the login user is both the task's assigner and assignee, 
      the user can edit all the fields except the total time spent
      field.
   4. total time spent field is updated by adding the value to session
      time spent field to the current value of total time spent field.
   5. if a task is marked as completed, the task is no longer editable.
      the user can only check the task details or delete it.
   6. the users can delete the task that assigned to them, in case they don't 
      want to do the task.
   7. A user can check complete the task with a value of 0 in time field,
      for scenario that they finnished the task far less than 15mins.
 



# TaskTracker

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

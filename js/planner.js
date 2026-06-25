class AcademicPlanner {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("academic_tasks")) || [];
    this.form = document.getElementById("planner-form");
    this.input = document.getElementById("task-input");
    this.taskList = document.getElementById("task-list");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.addTask(e));
    this.render();
  }

  save() {
    localStorage.setItem("academic_tasks", JSON.stringify(this.tasks));
    this.render();
  }

  addTask(e) {
    e.preventDefault();
    const taskText = this.input.value.trim();
    if (!taskText) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      completed: false,
      timestamp: new Date().toLocaleDateString(),
    };

    this.tasks.push(newTask);
    this.input.value = "";
    this.save();
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    this.save();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.save();
  }

  render() {
    this.taskList.innerHTML = "";

    if (this.tasks.length === 0) {
      this.taskList.innerHTML = `<p style="color: var(--text-muted)">No academic objectives listed. Add tasks above.</p>`;
      return;
    }

    this.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `card task-item ${task.completed ? "completed" : ""}`;
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.marginBottom = "1rem";

      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <input type="checkbox" ${task.completed ? "checked" : ""} class="task-checkbox">
          <span style="${task.completed ? "text-decoration: line-through; color: var(--text-muted);" : ""}">${task.text}</span>
        </div>
        <button class="delete-btn" style="background: none; border: none; color: var(--error); cursor: pointer;">Delete</button>
      `;

      // Event Hooking
      li.querySelector(".task-checkbox").addEventListener("change", () =>
        this.toggleTask(task.id),
      );
      li.querySelector(".delete-btn").addEventListener("click", () =>
        this.deleteTask(task.id),
      );

      this.taskList.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new AcademicPlanner());

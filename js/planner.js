class AcademicPlanner {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("academic_tasks")) || [];
    this.form = document.getElementById("planner-form");

    // Form Inputs
    this.input = document.getElementById("task-input");
    this.desc = document.getElementById("task-desc");
    this.deadline = document.getElementById("task-deadline");
    this.priority = document.getElementById("task-priority");

    // UI Elements
    this.taskList = document.getElementById("task-list");
    this.modal = document.getElementById("task-modal");
    this.openBtn = document.getElementById("open-modal-btn");
    this.closeBtn = document.getElementById("close-modal-btn");

    this.init();
  }

  init() {
    // Modal Event Listeners
    this.openBtn.addEventListener(
      "click",
      () => (this.modal.style.display = "block"),
    );
    this.closeBtn.addEventListener(
      "click",
      () => (this.modal.style.display = "none"),
    );

    // Form Submission
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
      description: this.desc.value.trim() || "No description provided.",
      deadline: this.deadline.value || "No deadline",
      priority: this.priority.value || "normal",
      completed: false,
      timestamp: new Date().toLocaleDateString(),
    };

    this.tasks.push(newTask);
    this.form.reset();
    this.modal.style.display = "none"; // Close modal after success
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
      this.taskList.innerHTML = `<p style="color: var(--text-muted); text-align: center;">No academic objectives listed. Initialize above.</p>`;
      return;
    }

    this.tasks.forEach((task) => {
      const priority = task.priority || "normal";
      // Map priority to CSS class
      const priorityClass = `priority-${priority}`;

      const li = document.createElement("li");
      li.className = `card task-item ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
           <div style="display: flex; align-items: center; gap: 1rem;">
              <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
              <span style="${task.completed ? "text-decoration: line-through; color: #64748b;" : ""} font-weight: bold;">
                ${task.text}
              </span>
           </div>
           <span class="${priorityClass}" style="font-size: 0.6rem; padding: 2px 6px; border: 1px solid; border-radius: 4px;">
              ${priority.toUpperCase()}
           </span>
        </div>
        <p style="font-size: 0.85rem; color: #94a3b8; margin: 0;">${task.description}</p>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; margin-top: 5px;">
          <span>Due: ${task.deadline}</span>
          <button class="delete-btn" style="background: none; border: none; color: #ef4444; cursor: pointer;">Delete</button>
        </div>
      </div>
    `;

      li.querySelector(".task-checkbox").addEventListener("click", () =>
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

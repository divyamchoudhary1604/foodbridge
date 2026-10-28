import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useToast } from "../../context/ToastContext";

export default function RescueChecklist() {
  const [tasks, setTasks] = useLocalStorage("foodbridge-tasks", [
    { id: 1, text: "Verify food temperature & packaging safety", completed: true },
    { id: 2, text: "Call donor 15 minutes before arrival", completed: false },
    { id: 3, text: "Carry insulated delivery bags & sanitizers", completed: true },
    { id: 4, text: "Get digital acknowledgement signature from NGO", completed: false }
  ]);

  const [inputTask, setInputTask] = useState("");
  const { showToast } = useToast();

  function handleAddTask(e) {
    e.preventDefault();
    if (!inputTask.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputTask.trim(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInputTask("");
    showToast("New checklist item added!", "success");
  }

  function handleToggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    showToast("Task removed", "info");
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="dash-subpage">
      <div className="dash-subpage-header">
        <div>
          <h2>✅ Volunteer Rescue Checklist</h2>
          <p className="text-muted">
            Interactive to-do list demonstrating state, events, and LocalStorage persistence.
          </p>
        </div>
        <span className="badge-cat" style={{ fontSize: "14px", fontWeight: "600" }}>
          {completedCount} of {tasks.length} Completed
        </span>
      </div>

      <form onSubmit={handleAddTask} style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <input
          type="text"
          className="form-input"
          style={{ flex: 1 }}
          placeholder="Add a new food safety or volunteer task..."
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button type="submit" className="primary-button small-button">
          + Add Task
        </button>
      </form>

      <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: task.completed ? "#f0fdf4" : "var(--color-bg)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "var(--color-text-muted)" : "var(--color-text)"
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", flex: 1 }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <span style={{ fontSize: "15px", fontWeight: "500" }}>{task.text}</span>
            </label>

            <button
              type="button"
              onClick={() => handleDeleteTask(task.id)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-danger)",
                cursor: "pointer",
                fontSize: "16px"
              }}
              aria-label="Delete task"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

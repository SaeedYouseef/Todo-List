// Categories and Tasks Data
let categories = [
  { title: "Personal", img: "boy.png" },
  { title: "Work", img: "briefcase.png" },
  { title: "Shopping", img: "shopping.png" },
  { title: "Coding", img: "web-design.png" },
  { title: "Health", img: "healthcare.png" },
  { title: "Fitness", img: "dumbbell.png" },
  { title: "Education", img: "education.png" },
  { title: "Finance", img: "saving.png" },
];

let tasks = [];

// Local Storage Functions
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Tasks saved to local storage:", tasks);
};

const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  if (tasksLocal) {
    tasks = tasksLocal;
    console.log("Tasks loaded from local storage:", tasks);
  } else {
    console.log("No tasks found in local storage");
  }
};

// Toggle Button Screen
const toggleButton = () => {
  const wrapper = document.querySelector(".wrapper");
  const backBtn = document.querySelector(".back-btn");

  const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
    localStorage.setItem("showCategory", wrapper.classList.contains("show-category"));
  };

  if (localStorage.getItem("showCategory") === "true") {
    wrapper.classList.add("show-category");
  }

  backBtn.addEventListener("click", toggleScreen);
};

toggleButton();

// Add Task Button
const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackDrop = document.querySelector(".black-backdrop");

const toggleAddTaskForm = () => {
  addTaskForm.classList.toggle("active");
  blackBackDrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener('click', toggleAddTaskForm);

// Update Totals
const updateTotals = () => {
  const numTasks = document.querySelector(".num-tasks");
  const totalTasks = document.querySelector(".total-tasks-number");
  const categoryTasks = tasks.filter(task => task.category.toLowerCase() === selectedCategory.title.toLowerCase());
  numTasks.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = tasks.length;
};

let selectedCategory = categories[0];

// Render Categories
const renderCategories = () => {
  const categoriesContainer = document.querySelector(".categories");
  const categoryTitle = document.querySelector(".category-title");
  const categoryImg = document.querySelector("#category-img");
  const wrapper = document.querySelector(".wrapper");

  categoriesContainer.innerHTML = "";

  categories.forEach((category) => {
    const categoryTasks = tasks.filter(task => task.category.toLowerCase() === category.title.toLowerCase());
    const div = document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      wrapper.classList.add("show-category");
      selectedCategory = category;
      updateTotals();
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `images/${category.img}`;
      renderTasks();
    });

    div.innerHTML = `
      <div class="left">
        <img src="images/${category.img}" alt=""/>
        <div class="content">
          <h1>${category.title}</h1>
          <p>${categoryTasks.length} Tasks</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
          </svg>
        </div>
      </div>
    `;

    categoriesContainer.appendChild(div);
  });
};

// Render Tasks
const renderTasks = () => {
  const tasksContainer = document.querySelector(".tasks");
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(task => task.category.toLowerCase() === selectedCategory.title.toLowerCase());

  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-task">No Task Today For This Category</p>`;
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");

      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        const index = tasks.findIndex(t => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
      });

      const deleteDiv = document.createElement("div");
      deleteDiv.classList.add("delete");
      deleteDiv.innerHTML = `
        <svg class="" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      `;

      label.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}>
        <span class="checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" width="2.2rem" height="2.2rem" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z" fill="#000000" />
          </svg>
        </span>
        <p>${task.task}</p>
      `;

      label.prepend(checkbox);
      div.prepend(label);
      div.appendChild(deleteDiv);
      tasksContainer.appendChild(div);

      const deleteBtn = div.querySelector('.delete');
      deleteBtn.addEventListener("click", () => {
        swal({
          title: "Are you sure you want to delete the task?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);
            saveLocal();
            renderTasks();
            swal("Poof! Your task has been deleted!", { icon: "success" });
          }
        });
      });
    });
  }
  renderCategories();
  updateTotals();
};

// Add New Task
const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === "") {
    swal("Please Enter A Task");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
    taskInput.value = "";
    tasks.push(newTask);
    saveLocal();
    toggleAddTaskForm();
    renderTasks();
  }
};

// Initialize
const taskInput = document.getElementById("task-input");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const categorySelect = document.getElementById("category-select");

cancelBtn.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", addTask);

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});

getLocal();
renderTasks();
console.log("Initial render done");

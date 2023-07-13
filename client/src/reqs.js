const url = "http://localhost:5000";

export async function fetchTodos() {
  console.log("hi");
  const res = await fetch(url + "/todos");
  const data = await res.json();
  data.map((element) => {
    const timestamp = new Date(element.duedate);
    const date = timestamp.toISOString().split("T")[0];
    element.duedate = date;
  });
  return data;
}

export async function createTodo(todo) {
  const res = await fetch(url + "/todos", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  return data;
}

export async function updateTodo(todo) {
  const res = await fetch(url + "/todos", {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  return data;
}

export async function checkedTodo(todo) {
  const res = await fetch(url + "/todos/checked", {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  return data;
}

export async function deleteTodoItem(id) {
  const res = await fetch(url + "/todos/" + id, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

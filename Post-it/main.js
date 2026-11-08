(() => {
  const STORAGE_KEY = "parede-de-ideias-notes-v1";
  const colors = [
    "#fff0a8",
    "#d9f0d7",
    "#dce9ff",
    "#f8dce8",
    "#f9e3c4",
    "#e9defa",
  ];
  const form = document.querySelector("#note-form");
  const input = document.querySelector("#note-input");
  const wall = document.querySelector("#wall");
  const count = document.querySelector("#note-count");
  const status = document.querySelector("#status");
  let notes = [];

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(saved))
      notes = saved.filter(
        (note) =>
          note && typeof note.text === "string" && typeof note.id === "string",
      );
  } catch (_) {
    status.textContent = "Não foi possível carregar os post-its salvos.";
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      return true;
    } catch (_) {
      status.textContent =
        "Não foi possível salvar. Verifique o espaço disponível no navegador.";
      return false;
    }
  }

  function render() {
    wall.replaceChildren();
    const total = notes.length;
    count.textContent = `${total} ${total === 1 ? "post-it" : "post-its"}`;
    if (!total) {
      const empty = document.createElement("div");
      empty.className = "empty";
      const title = document.createElement("strong");
      title.textContent = "Sua parede está vazia";
      const message = document.createElement("span");
      message.textContent =
        "Escreva uma ideia acima para criar seu primeiro post-it.";
      empty.append(title, message);
      wall.append(empty);
      return;
    }

    notes.forEach((note, index) => {
      const card = document.createElement("article");
      card.className = "note";
      card.style.setProperty("--note-color", colors[index % colors.length]);
      card.style.setProperty("--tilt", `${((index % 3) - 1) * 1.2}deg`);
      const text = document.createElement("p");
      text.textContent = note.text;
      const footer = document.createElement("footer");
      const date = document.createElement("time");
      date.dateTime = note.createdAt;
      date.textContent = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(note.createdAt));
      const remove = document.createElement("button");
      remove.className = "delete-button";
      remove.type = "button";
      remove.textContent = "Excluir";
      remove.setAttribute(
        "aria-label",
        `Excluir post-it: ${note.text.slice(0, 40)}`,
      );
      remove.addEventListener("click", () => {
        notes = notes.filter((item) => item.id !== note.id);
        save();
        render();
        status.textContent = "Post-it excluído.";
      });
      footer.append(date, remove);
      card.append(text, footer);
      wall.append(card);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
      input.focus();
      status.textContent = "Digite uma mensagem antes de adicionar.";
      return;
    }
    notes.unshift({
      id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
      text,
      createdAt: new Date().toISOString(),
    });
    save();
    render();
    input.value = "";
    input.focus();
    status.textContent = "Post-it adicionado.";
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  render();
})();

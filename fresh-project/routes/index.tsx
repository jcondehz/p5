import { PageProps, Handlers } from "$fresh/server.ts";
import Vista from "../islands/Vista.tsx";
import Buscador from "../islands/Buscador.tsx";

type DataAPI = {
  id: string;
  title: string;
  summary: string;
  cover: string;
  author: string;
};

export const handler: Handlers = {
  GET: async (_, ctx) => {
    try {
      const response = await fetch("https://back-p5-y0e1.onrender.com/api/posts/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      const posts: DataAPI[] = jsonResponse.data?.posts || [];
      return ctx.render(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return ctx.render([]); 
    }
  },
};

const Page = ({ data }: PageProps<DataAPI[]>) => {
  const posts = Array.isArray(data) ? data : [];

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title")?.toString() || "";
    const cover = formData.get("cover")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const author = formData.get("author")?.toString() || "";

    const messageElement = document.getElementById("form-message");
    const submitButton = form.querySelector("button[type='submit']") as HTMLButtonElement;

    if (messageElement) {
      messageElement.textContent = "";
      messageElement.className = ""; 
    }
    submitButton.disabled = true;

    try {
      const response = await fetch("https://back-p5-y0e1.onrender.com/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          author,
          cover,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el post");
      }

      const data = await response.json();
      form.reset(); // Limpia el formulario
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Buscador />
      <h1>Crear un nuevo post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          required
          minLength={3}
        />
        <input
          type="text"
          name="cover"
          placeholder="URL de la imagen"
          required
        />
        <textarea
          name="content"
          placeholder="Contenido"
          required
          minLength={10}
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          required
        />
        <button type="submit">Crear Post</button>
      </form>
      <p id="form-message"></p>
      <Vista posts={posts} />
    </div>
  );
};

export default Page;
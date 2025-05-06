import { FunctionComponent } from "preact/src/index.d.ts";
import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

type Post = {
  id: string;
  title: string;
  summary: string;
  cover: string;
  author: string;
};

type VistaProps = {
  posts: Post[];
};

const Vista: FunctionComponent<VistaProps> = ({ posts }) => {
  const isGridView = useSignal<boolean>(false); 

  return (
    <div>
      <button
        onClick={() => (isGridView.value = !isGridView.value)}
        class="toggle-view-btn"
      >
        {isGridView.value ? "Vista Lista" : "Vista Cuadrícula"}
      </button>
      <div class={`post-list ${isGridView.value ? "grid-view" : "list-view"}`}>
        {posts.map((post) => (
          <div key={post.id} class="post-item">
            {isGridView.value && <img src={post.cover} alt={post.title} class="post-image" />}
            <div class="post-content">
              <h2 class="post-title">{post.title}</h2>
              <p class="post-author">Autor: {post.author}</p>
              {!isGridView.value && <p class="post-summary">{post.summary}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vista;
import { FunctionComponent } from "preact";

type BlogProps = { 
  posts: {
    id: string;
    title: string;
    summary: string;
    cover: string;
    author: string;
  }[];
};

const ComponenteLista: FunctionComponent<BlogProps> = ({ posts }) => {
    return (
      <div class="post-list">
        {posts.map((post) => (
          <div key={post.id} class="post-item">
            <div class="post-content">
              <h2 class="post-title">{post.title}</h2>
              <p class="post-author">Autor: {post.author}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
export default ComponenteLista;
import { FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

type Post = {
  id: string;
  title: string;
  author: string;
};

const Buscador: FunctionalComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [results, setResults] = useState<Post[]>([]); 
  const timeout = useRef<number | null>(null); 


  useEffect(() => {

    if (timeout.current) {
      clearTimeout(timeout.current);
    }


    if (searchTerm.trim() !== "") {
      timeout.current = window.setTimeout(() => {
        fetchResults();
      }, 1000);
    } else {

      setResults([]);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [searchTerm]);


  const fetchResults = async () => {
    try {
      const response = await fetch(`/post?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Post[] = await response.json();
      setResults(data); 
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]); 
    }
  };

  return (
    <div>
      {}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onInput={(e) => setSearchTerm(e.currentTarget.value)} 
        class="search-input"
      />
      {}
      <ul class="search-results">
        {results.map((post) => (
          <li key={post.id} class="search-item">
            <h3>{post.title}</h3>
            <p>Autor: {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buscador;
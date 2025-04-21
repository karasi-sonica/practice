import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("To Watch");
  const [movies, setMovies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handleSubmit() {
    const newMovie = { title, year, status };

    if (editIndex === null) {
      setMovies([...movies, newMovie]);
    } else {
      const updatedMovies = [...movies];
      updatedMovies[editIndex] = newMovie;
      setMovies(updatedMovies);
      setEditIndex(null);
    }

    setTitle("");
    setYear("");
    setStatus("To Watch");
  }

  function handleEdit(index) {
    const movie = movies[index];
    setTitle(movie.title);
    setYear(movie.year);
    setStatus(movie.status);
    setEditIndex(index);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Tracker</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{ marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Watch">To Watch</option>
          <option value="Watched">Watched</option>
        </select>

        <button type="submit">
          {editIndex === null ? "Add Movie" : "Update Movie"}
        </button>
      </form>

      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {movie.title} ({movie.year}) - {movie.status}
            <button onClick={() => handleEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

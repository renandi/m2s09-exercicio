import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import PostList from './PostList';

function App() {
  // const [count, setCount] = useState(0)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("");
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
    setPostCount(Array.isArray(storedPosts) ? storedPosts.length : 0);
  }, []);

  function publish(event) {

    event.preventDefault();

    if (title === "") {
      toast.error("Título não pode ser vazio!");
      return;
    }

    if (description === "") {
      toast.error("Descrição não pode ser vazia!")
      return;
    }

    if (!imgURL.startsWith("http")) {
      toast.error("Link da imagem deve iniciar com 'http'!")
      return;
    }

    if (date === "") {
      toast.error("Data de publicação deve ser informada!")
      return;
    }

    if (!category) {
      toast.error("Selecione uma categoria!");
      return;
    }

    // Cria inputDate usando apenas ano, mês e dia
    const [year, month, day] = date.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
    inputDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      toast.error("Data de publicação deve ser maior ou igual ao dia de hoje!");
      return;
    }

    const postList = JSON.parse(localStorage.getItem("posts") || "[]");

    const lastId = posts.length > 0 ? Math.max(...posts.map((p: any) => p.id)) : 0;
    const newId = lastId + 1;

    const post = {
      id: newId,
      titulo: title,
      descricao: description,
      capa: imgURL,
      data: date,
      tipo: category
    }

    console.log(post);

    postList.push(post);
    localStorage.setItem("posts", JSON.stringify(postList));
    setPosts(postList);
    toast.success("Post salvo com sucesso!")
    setPostCount(postList.length);

  }


  return (
    <>
      <PostList posts={posts} />
      <h1>Painel de Gerenciamento</h1>
      <p>Atualmente você tem {postCount} posts cadastrados</p>
      {posts.filter((p) => p.tipo.toLowerCase() == "artigo").length > 0 && (
        <p>{posts.filter((p) => p.tipo.toLowerCase() == "artigo").length} artigos</p>
      )}

      {posts.filter((p) => p.tipo.toLowerCase() == "notícia").length > 0 && (
        <p>{posts.filter((p) => p.tipo.toLowerCase() == "notícia").length} Notícias</p>
      )}

      {posts.filter((p) => p.tipo.toLowerCase() == "tutorial").length > 0 && (
        <p>{posts.filter((p) => p.tipo.toLowerCase() == "tutorial").length} Tutoriais</p>
      )}
      {posts.filter((p) => p.tipo.toLowerCase() == "entrevista").length > 0 && (
      <p>{posts.filter((p) => p.tipo.toLowerCase() == "entrevista").length} Entrevista</p>
      )}
      <form action="">
        <h3>Novo Post</h3>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="imgURL">URL da imagem de capa</label>
        <input
          type="text"
          name="imgURL"
          id="imgURL"
          value={imgURL}
          onChange={(e) => setImgURL(e.target.value)} />

        <label htmlFor="date">Data de publicação</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} />

        <label htmlFor="categoria">Categoria</label>
        <select
          name="categoria"
          id="categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="">Selecione a categoria</option>
          <option value="artigo">Artigo</option>
          <option value="notícia">Notícia</option>
          <option value="tutorial">Tutorial</option>
          <option value="entrevista">Entrevista</option>
        </select>

        <button onClick={publish}>Publicar</button>

      </form>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        // pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} />
    </>
  )
}

export default App

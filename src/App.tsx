import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';

function App() {
  // const [count, setCount] = useState(0)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("article");
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const postList = JSON.parse(localStorage.getItem("postList") || "[]");
    setPostCount(Array.isArray(postList) ? postList.length : 0);
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

    if (date ==="") {
      toast.error("Data de publicação deve ser informada!")
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

    const post = {
      title: title,
      description: description,
      imgURL: imgURL,
      date: date,
      category: category
    }

    console.log(post);

    const postList = JSON.parse(localStorage.getItem("postList") || "[]");
    postList.push(post);
    localStorage.setItem("postList", JSON.stringify(postList));
    toast.success("Post salvo com sucesso!")
    setPostCount(postList.length);

  }
  
  // function getPostCount() {
  //   const postList = JSON.parse(localStorage.getItem("postList") || "[]");
  //   setPostCount(postList.lenght);
  // }

  return (
    <>
      <h1>Painel de Gerenciamento</h1>
      <p>Atualmente você tem {postCount} posts cadastrados</p>
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
          <option value="article">Artigo</option>
          <option value="news">Notícia</option>
          <option value="tutorial">Tutorial</option>
          <option value="interview">Entrevista</option>
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

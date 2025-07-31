import { useEffect, useState } from "react";
import Post from "./components/Post";
import './PostList.css'

function PostList({ posts }) {

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        setPostList(JSON.parse(localStorage.getItem("posts") || "[]"));
        // setPostList(JSON.parse(localStorage.getItem("postList") || "[]"));
    }, [])

    function handleDelete(id: number) {
        const newList = postList.filter((p) => p.id !== id);
        setPostList(newList);
        localStorage.setItem("posts", JSON.stringify(newList));

    }

    return (
        <>
            <div className="postListContainer">

                {
                    posts.map((p) =>
                        <Post
                            key={p.id}
                            id={p.id}
                            title={p.titulo}
                            description={p.descricao}
                            date={p.data}
                            category={p.tipo}
                            imgURL={p.capa}
                            handleDelete={() => handleDelete(p.id)}
                        />)
                }
            </div>
        </>
    )
}

export default PostList;
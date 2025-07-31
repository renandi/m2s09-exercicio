import './Post.css'

function Post({id, title, description, imgURL, date, category, handleDelete}) {

    return (

        <div className="postContainer">
            <img src={imgURL} alt="" />
            <div className="postContent">
                <p className='category'>{category.toUpperCase()}</p>
                <h3 className='title'>{title}</h3>
                <p className='description'>{description}</p>

                <div className='postFooter'>
                    <p className='date'>Publicado em: {new Intl.DateTimeFormat("pt-br").format(new Date(date))}</p>
                    <a href="" onClick={handleDelete}>Excluir</a>
                </div>

            </div>
        </div>

    )
}

export default Post;
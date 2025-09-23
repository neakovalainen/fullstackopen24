const BlogForm = ({ 
  onSubmit, 
  title, 
  author, 
  url, 
  changeTitle, 
  changeAuthor, 
  changeUrl
  } ) => {
  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            title:
            <input
              type="type"
              value={title}
              onChange={changeTitle}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="type"
              value={author}
              onChange={changeAuthor}  
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="type"
              value={url}
              onChange={changeUrl}
            />
          </label>
        </div>
        <button type="submit">create blog</button>
      </form>
    </div>
  )
}

export default BlogForm
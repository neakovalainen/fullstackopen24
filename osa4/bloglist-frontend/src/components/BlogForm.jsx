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
              placeholder='write title here'
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
              placeholder='write author here'
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
              placeholder='write url here'
            />
          </label>
        </div>
        <button type="submit">create blog</button>
      </form>
    </div>
  )
}

export default BlogForm
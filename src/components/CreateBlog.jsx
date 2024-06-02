const CreateBlog = ({
   handleBlogCreate,
   title,
   setTitle,
   author,
   setAuthor,
   url,
   setUrl,
}) => (
   <div style={{ margin: "20px" }}>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlogCreate}>
         <div>
            title:
            <input
               type="text"
               name="title"
               value={title}
               onChange={({ target }) => {
                  setTitle(target.value);
               }}
            />
         </div>
         <div>
            author:
            <input
               type="text"
               name="author"
               value={author}
               onChange={({ target }) => {
                  setAuthor(target.value);
               }}
            />
         </div>
         <div>
            url:
            <input
               type="text"
               name="url"
               value={url}
               onChange={({ target }) => {
                  setUrl(target.value);
               }}
            />
         </div>
         <button type="submit">Create</button>
      </form>
   </div>
);

export default CreateBlog;

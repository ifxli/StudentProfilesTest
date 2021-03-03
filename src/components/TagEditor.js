function TagEditor(props) {
  return (
    <div>
      <div className="tag-container">
        {props.tags.map((tag) => <div className="tag">{tag}</div>)}
      </div>
      <input
        className="tag-input"
        placeholder="Add a tag"
        onKeyPress={(e) => {
          if (e.code === "Enter" && e.target.value.trim() != "") {
            props.onTagAdded(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </div>
  )
}

export default TagEditor;

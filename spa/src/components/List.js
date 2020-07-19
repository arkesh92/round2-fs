import React from 'react';

function List(props) {
  // console.log(JSON.stringify(props));
  let list;
  if (props.library.length) {
    list = props.library.map(item =>
      <div key={item.id} className="list-item">
        <div className="content">
          <div className="content-title">{item.title}</div>
          <div className="content-summary">{item.summary}</div>
          <div className="content-author">— {item.author}</div>
        </div>
      </div>
    )
  }
  else {
    list=<h4>No books in your collection</h4>;
  }

  return (
    <div className="list">
      {list}
    </div>
  );
}

export default List;

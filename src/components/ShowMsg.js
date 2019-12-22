import React from 'react';
function ShowMsg(props) {
  return (
    <div
      className="box"
      style={{
        height: '320px',
        display: 'table'
      }}
    >
      <h1
        style={{
          display: 'table-cell',
          verticalAlign: 'middle',
          width: 'fit-content'
        }}
      >
        {props.msg + 'Show Data'}
      </h1>
    </div>
  );
}

export default ShowMsg;

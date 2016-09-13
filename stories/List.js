import React from 'react';
import Item from './Item';

const ListStyles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10,
};

const List = ({ children, onClick }) => (
  <ul
    style={ListStyles}
  >
    <li>hoge</li>
    <li>hoge</li>
    <li>hoge</li>
  </ul>
);

List.propTypes = {
  // children: React.PropTypes.string.isRequired,
};

export default List;

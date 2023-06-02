import { Row,Col } from "react-bootstrap";



const Item = ({ id, title, url, author, num_comments, points, onRemoveItem }) => {

  return (
    <Row>
      <Col xs={8} md={10} lg={10}>
      <li className="form-check-inline">
          <span className="me-2">
           <a className=" text-decoration-none" href={url}>{title}</a>
           </span>
           <span className="me-2">{author}</span>
           <span className="me-2">{num_comments}</span>
          <span className="me-2">{points}</span>
        </li>
      </Col>
      <Col xs={4} md={2} lg={2}>
        <button className="border-0 btn " onClick={() => onRemoveItem(id)}>Remove</button>
      </Col>
   </Row>
  );
};

export default Item;
 
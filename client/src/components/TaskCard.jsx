import React from "react";
import Card from "react-bootstrap/Card";

const TaskCard = ({ id, title, description, assignedBy }) => {
  return (
    <Card className="mb-3">
      <Card.Header>
        <h5>{title}</h5>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Description:</strong> {description}
        </Card.Text>
        <Card.Text>
          <strong>Assigned by:</strong> {assignedBy}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;

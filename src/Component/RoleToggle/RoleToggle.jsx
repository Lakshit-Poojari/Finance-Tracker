import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { TransactionContext } from "../../Context/TransactionContext";

function RoleToggle() {
  const { role, setRole } = useContext(TransactionContext);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">
        Role: {role}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setRole("viewer")}>
          Viewer
        </Dropdown.Item>

        <Dropdown.Item onClick={() => setRole("admin")}>
          Admin
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default RoleToggle;
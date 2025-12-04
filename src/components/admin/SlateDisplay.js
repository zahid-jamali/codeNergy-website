import React from "react";

const renderElement = (element) => {
  // Leaf node
  if (element.text !== undefined) {
    if (element.bold) {
      return <strong>{element.text}</strong>;
    }
    return <span>{element.text}</span>;
  }

  // Element children
  const children = element.children?.map((child, i) => (
    <React.Fragment key={i}>{renderElement(child)}</React.Fragment>
  ));

  switch (element.type) {
    case "bulleted-list":
      return (
        <ul
          style={{
            color: "white",
            paddingLeft: "1.5em",
            listStyleType: "disc",
          }}
        >
          {children}
        </ul>
      );
    case "list-item":
      return (
        <li style={{ color: "white", marginBottom: "0.5em" }}>{children}</li>
      );
    case "paragraph":
      return (
        <p style={{ color: "white", marginBottom: "0.5em" }}>{children}</p>
      );
    default:
      return (
        <p style={{ color: "white", marginBottom: "0.5em" }}>{children}</p>
      );
  }
};

const SlateDisplay = ({ value }) => {
  if (typeof value === "string") {
    value = JSON.parse(value);
  }

  return (
    <div>
      {value.map((node, i) => (
        <React.Fragment key={i}>{renderElement(node)}</React.Fragment>
      ))}
    </div>
  );
};

export default SlateDisplay;

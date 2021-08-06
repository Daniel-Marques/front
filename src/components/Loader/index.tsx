import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 300,
        textAlign: "center",
        // display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src="./assets/images/loading.gif" alt="" width="50" style={{marginBottom: 10}}/>
      <p>Carregando os dados para você...</p>
    </div>
  );
};

export default Loader;

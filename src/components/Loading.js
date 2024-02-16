const Loading = () => {
  const parentContainerStyles = {
    // display: "flex",
    // flexDirection: "column",
    padding: "60px",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
  };

  return (
    <div style={parentContainerStyles}>
      <div>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif"
          alt="loading-img"
          style={{ width: "50px" }}
        />
      </div>
      <div>Loading...</div>
    </div>
  );
};
export default Loading;

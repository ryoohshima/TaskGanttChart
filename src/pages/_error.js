function CustomError({ statusCode }) {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>予期しないエラーが発生しました。</p>
    </div>
  );
}

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;

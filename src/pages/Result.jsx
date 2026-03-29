function Result({ data, goBack }) {
  return (
    <div style={{ padding: 40 }}>
      <h2>Assessment Result</h2>

      <p><strong>Category:</strong> {data.category}</p>

      <h3>Answers Provided:</h3>
      <pre>{JSON.stringify(data.answers, null, 2)}</pre>

      <p>AI analysis will appear here later.</p>

      <button onClick={goBack}>Start Over</button>
    </div>
  );
}

export default Result;
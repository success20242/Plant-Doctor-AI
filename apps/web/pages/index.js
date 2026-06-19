import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h1>Plant Doctor 🌱</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Analyze</button>

      {result && (
        <div>
          <h3>{result.disease}</h3>
          <p>{result.treatment}</p>
        </div>
      )}
    </div>
  );
}

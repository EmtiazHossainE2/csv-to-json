import { useState } from "react";

const Home = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Make CSV TO JSON 
  const csvToJson = (csvData) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(",");
      const row = {};

      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = data[j];
      }
      jsonData.push(row);
    }

    return jsonData;
  };

  // Handle Convert Here 
  const handleConvertToJson = () => {
    if (!file) {
      console.log("No file selected.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const csvData = event.target.result;
      const json = csvToJson(csvData);

      console.log(json);
    };

    reader.readAsText(file);
  };



  return (
    <div className="flex flex-col items-center mt-8">
      <input
        type="file"
        accept=".csv"
        className="mb-4 border px-3 py-1 rounded-lg"
        onChange={handleFileChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleConvertToJson}
      >
        Convert to JSON
      </button>
    </div>
  );
};

export default Home;

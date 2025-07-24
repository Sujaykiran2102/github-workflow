import { useEffect, useState } from "react";
import socket from "./socket";
import Editor from "@monaco-editor/react";

function App() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [code, setCode] = useState("// Start coding...");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("receiveCode", (newCode) => setCode(newCode));
    socket.on("roomUpdate", (members) => setPlayers(members));
    socket.on("battleResult", (result) => {
      alert(`Battle result: ${result}`);
    });

    return () => {
      socket.off("receiveCode");
      socket.off("roomUpdate");
      socket.off("battleResult");
    };
  }, []);

  const joinRoom = () => {
    if (roomId.trim() !== "") {
      socket.emit("joinRoom", roomId);
      setJoined(true);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeUpdate", { roomId, code: newCode });
  };

  const submitCode = () => {
    // fake result just for demo; connect Judge0 later
    const result = `User ${socket.id} submitted!`;
    socket.emit("submitCode", { roomId, result });
  };

  return (
    <div className="p-6">
      {!joined ? (
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            className="border p-2 rounded"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-bold">Room: {roomId}</h2>
            <p>Players: {players.length}</p>
          </div>
          <Editor
            height="400px"
            defaultLanguage="javascript"
            value={code}
            onChange={handleCodeChange}
          />
          <button
            className="bg-green-600 mt-4 text-white px-4 py-2 rounded"
            onClick={submitCode}
          >
            Submit Code
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
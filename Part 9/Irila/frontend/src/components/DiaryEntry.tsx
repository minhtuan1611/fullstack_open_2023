/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../constants";

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

const DiaryEntry: React.FC = () => {
  const [newEntry, setNewEntry] = useState<DiaryEntry>({
    id: 0,
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: "",
  });
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/diaries`)
      .then((response) => response.json())
      .then((data) => {
        setDiaries(data);
      })
      .catch((error) => {
        console.error("Error: Error fetching diaries:", error);
      });
  }, []);

  const handleFormChange = (field: string, value: string) => {
    if (
      field === "weather" &&
      Object.values(Weather).includes(value as Weather)
    ) {
      setNewEntry({ ...newEntry, [field]: value as Weather });
    } else if (
      field === "visibility" &&
      Object.values(Visibility).includes(value as Visibility)
    ) {
      setNewEntry({ ...newEntry, [field]: value as Visibility });
    } else if (field === "comment" && typeof value === "string") {
      setNewEntry({ ...newEntry, [field]: value });
    } else {
      console.error("Error: Invalid value for", field, value);
    }
  };
  const handleFormSubmit = () => {
    fetch(`${apiBaseUrl}/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: Failed to add a diary entry");
        }
        return response.json();
      })
      .then((data: DiaryEntry) => {
        setDiaries([...diaries, data]);
        setNewEntry({
          id: 0,
          date: "",
          weather: Weather.Sunny,
          visibility: Visibility.Great,
          comment: "",
        });
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form>
        <h2>Add new Entry</h2>
        <label>Date:</label>
        <input
          type="date"
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
        />
        <br />
        <label>Visibility:</label>
        Great
        <input
          type="radio"
          name="visibility"
          value="Clear"
          checked={newEntry.visibility === "great"}
          onChange={() => setNewEntry({ ...newEntry, visibility: "great" })}
        />
        Good
        <input
          type="radio"
          name="visibility"
          value="Foggy"
          checked={newEntry.visibility === "good"}
          onChange={() => setNewEntry({ ...newEntry, visibility: "good" })}
        />
        Ok
        <input
          type="radio"
          name="visibility"
          value="ok"
          checked={newEntry.visibility === "ok"}
          onChange={() => setNewEntry({ ...newEntry, visibility: "ok" })}
        />
        Poor
        <input
          type="radio"
          name="visibility"
          value="Poor"
          checked={newEntry.visibility === "poor"}
          onChange={() => setNewEntry({ ...newEntry, visibility: "poor" })}
        />
        <br />
        <label>Weather: </label>
        Sunny
        <input
          type="radio"
          name="weather"
          value={Weather.Sunny}
          checked={newEntry.weather === Weather.Sunny}
          onChange={() => setNewEntry({ ...newEntry, weather: Weather.Sunny })}
        />
        Rainy
        <input
          type="radio"
          name="weather"
          value={Weather.Rainy}
          checked={newEntry.weather === Weather.Rainy}
          onChange={() => setNewEntry({ ...newEntry, weather: Weather.Rainy })}
        />
        Cloudy
        <input
          type="radio"
          name="weather"
          value={Weather.Cloudy}
          checked={newEntry.weather === Weather.Cloudy}
          onChange={() => setNewEntry({ ...newEntry, weather: Weather.Cloudy })}
        />
        Stormy
        <input
          type="radio"
          name="weather"
          value={Weather.Stormy}
          checked={newEntry.weather === Weather.Stormy}
          onChange={() => setNewEntry({ ...newEntry, weather: Weather.Stormy })}
        />
        Windy
        <input
          type="radio"
          name="weather"
          value={Weather.Windy}
          checked={newEntry.weather === Weather.Windy}
          onChange={() => setNewEntry({ ...newEntry, weather: Weather.Windy })}
        />
        <br />
        <label>Comment:</label>
        <input
          type="text"
          value={newEntry.comment}
          onChange={(e) => handleFormChange("comment", e.target.value)}
        />
        <br />
        <button type="button" onClick={handleFormSubmit}>
          Add Entry
        </button>
      </form>{" "}
      <h1>Diary Entries</h1>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <h3>{diary.date}</h3>
            <p>weather: {diary.weather}</p>
            <p>visibility: {diary.visibility}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntry;

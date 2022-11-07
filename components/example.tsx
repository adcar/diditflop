import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function Example() {
  const { data, error } = useSWR("/search/movie?query=love");
  const [inputValue, setInputValue] = useState("");

  if (error) {
    return <h1>There was an error</h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }

    console.log("data", data);

  return (
    <input type="text" onChange={(e) => {console.log("changed to ", e.target.value)}} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    );
}

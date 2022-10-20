import useSWR from "swr";

export default function Example() {
  const { data, error } = useSWR("/discover/movie");

  if (error) {
    return <h1>There was an error</h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }

  console.log("data");
  return (
    <p>
      <code>{JSON.stringify(data)}</code>
    </p>
  );
}

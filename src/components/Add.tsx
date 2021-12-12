import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";

const AddItem = () => {
  const [item, setItem] = useState<string>("");

  const save = async () => {
    const data = { name: item };
    try {
      await API.graphql(graphqlOperation(createTodo, { input: data }));
      console.log("Success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <input onChange={(e) => setItem(e.target.value)} />
      <button onClick={() => save()}>SAVE</button>
    </div>
  );
};

export default AddItem;

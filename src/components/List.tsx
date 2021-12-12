import { useState, useEffect } from "react"
import { API, graphqlOperation } from "aws-amplify"
import { listTodos } from "../graphql/queries"

export type GraphQLResult = {
  data: Record<string, any>
  errors: [object]
  extensions: {
    [key: string]: any
  }
}

const ListItems = () => {
  const [list, setList] = useState<Partial<GraphQLResult>>()

  useEffect(() => {
    const fetch = async () => {
      try {
        let result = await API.graphql(graphqlOperation(listTodos))
        setList({ data: result })
      } catch (error) {
        alert(error)
      }
    };
    fetch()
  }, [])

  if (list) {
    const todoList = list.data?.data.listTodos
    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>
          {todoList.items.map((item: {name: string}, index: number) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>List is Nothing</div>
  )
}

export default ListItems;
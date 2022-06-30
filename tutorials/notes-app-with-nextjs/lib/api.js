async function fetchAPI(query, { variables } = {}, read ) {
    const url = read ? process.env.NEXT_PUBLIC_WEBINY_API_READ_URL : process.env.NEXT_PUBLIC_WEBINY_API_MANAGE_URL;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEBINY_API_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
  
    const json = await res.json()
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors))
    }
    return json.data
}
  
  
export async function getAllNotesForHome() {
    const data = await fetchAPI(
        `query Notes {
          listNotes {
            data {
              id
              title
              description
            }
          }
        }
      `,
      {},
      true
    );
    return data.listNotes.data
}
 

export async function addNote(data){
  const response = await fetchAPI(`
    mutation createNote($title:String!,$description:String!){
      createNote(data:{title:$title,description:$description}){
        data {
          id
          title
          description
          createdOn
        }
      }
    }
  `,{
    variables:{
      'title':data.title,
      'description':data.description
    }
  },
  false
  );
  return response.createNote.data;
}

export async function publishNote(data){
  const response = await fetchAPI(`
    mutation publishNote($id:ID!){
      publishNotes(revision:$id){
        data {
          id
          title
          description
        }
      }
    }
  `,{
    variables:{
      id:data.id
    }   
  },
  false
  );
  return response.publishNotes.data;
}

export async function deleteNote(data){
  const response = await fetchAPI(`
    mutation publishNote($id:ID!){
      deleteNotes(revision:$id){
        data
      }
    }
  `,{
    variables:{
      id:data.id
    }   
  },
  false
  );
  return response.deleteNotes.data;
}
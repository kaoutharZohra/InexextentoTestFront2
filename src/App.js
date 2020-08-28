import React, { useState } from 'react';
const axios = require('axios');



const Card = props => { // Used to sho the user details 
  return (
    <div style={{ margin: '1em' }}>
      <img alt="avatar" style={{ width: '70px' }} src={props.avatar_url} />
      <div>
        <div style={{ fontWeight: 'bold' }}>{props.name}</div>
        <div>{props.blog}</div>
      </div>
    </div>
  )
}
// The CardList will the history of the reseached users
const CardList = props => <div>{props.cards.map(card => <Card {...card} />)}</div>

const Form = props => {
  const [username, setUsername] = useState('')

  function handleSubmit (event){
    event.preventDefault()


     axios.get(`https://api.github.com/users/${username}`) 
     .then(resp => {
        props.onSubmit(resp.data)
        setUsername('')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={event => setUsername(event.target.value)}
        placeholder="GitHub username"
        required
      />
      <button type="submit"> Find</button>
    </form>
  )
}

const App = () => {
  const [cards, setCards] = useState([])

  function addNewCard(cardInfo){
    setCards(cards.concat(cardInfo))
  }

  return (
    <div>
      <Form onSubmit={addNewCard} />
      <CardList cards={cards} />
    </div>
  )
}


export default App;

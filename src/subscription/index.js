import React, { useContext, useEffect, useState } from 'react'
import Styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import Card from "./Card"
import Payment from "./Payment/index"
import Table from "../components/table"
import axios from 'axios'



const Wrapper = Styled.div`
font-family: "Roboto","Helvetica","Arial",sans-serif;
.title{
  font-size: 3rem;
  margin: 2rem auto;
  text-align: center;
}
margin: 2rem auto;
/* background: #ccc; */
.container{
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(200px,350px));
  grid-gap: 2rem;
}
padding: 2rem;
`
const InputStyle = Styled.div`
`

const options = [
  { sub: 1440, price: 2, color: "#95e9bb" },
  { sub: 720, price: 3.5, color: "#0ca62b" },
  { sub: 60, price: 10, color: "#62c5fd" },
  { sub: 30, price: 25, color: "#707f2a" },
  { sub: 10, price: 55, color: "#b00c88" },
  { sub: 5, price: 99, color: "#8fdb2d" },
  { sub: 2, price: 200, color: "#6a1b7f" },
  { sub: 1, price: 350, color: "#01229c" },
]

function Subscription() {

  const [card, setCard] = useState()
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const navigate = useNavigate()

  const subscribeUser = () =>{
    alert("this is a test subscription for every minute")
    const user = JSON.parse(localStorage.getItem("phantom_user"))
        console.log({user})
        let macAddress = JSON.parse(localStorage.getItem("IPData"))
        console.log({macAddress})
        
    const data = {
      name: "1 min sub",
      "subRatePerMin": 1,
      "hasActiveSub": true,
      "email": user.email,
      durationInMinutes: `${24* 60 *60}`,
      MacAddress:macAddress.data[0].IP ?? "40:91:51:4F:9A:0C"
  }
  console.log({data})
  axios
  .post("https://phantom-api.herokuapp.com/api/sub",data, {
    headers: {
    authorization:`Bearer ${user.token}`
  }
  })
  .then((res) => {
  console.log({res})
  alert("completed, look at your wallet")
  })
  .catch((err) => {
    console.log("The error", err)
    alert("failed to create an account. I think you have a former data on the database.")
  });
  
  }
  return (
    <>
      <button style={ { margin: "4rem 2rem 0", border: "none", boxShadow: "none", fontSize: "1.5rem" } } onClick={ card ? () => setCard(null) : () => navigate("/dashboard") } > { "<" } back</button>
      { !card ? <Wrapper>
        <h3 className='title'>Subscription and Pricing</h3>
        <div className='container' onClick={()=>subscribeUser()}>
          { options.map((el, index) => 
          <Card key={ el.sub } sub={ el.sub } price={ el.price } color={ el.color } 
          // setCard={ setCard }
          setCard={subscribeUser }
           />
          ) }
        </div>
      </Wrapper> : <Payment price={ card.price } sub={ card.sub } color={ card.color } setCard={ () => null } /> }
    </>
  )
}

export default Subscription


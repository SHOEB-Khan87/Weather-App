import React, { useState, useEffect } from 'react'

const getData = () => {
  let get = localStorage.getItem("test")
  if (get) {
    return JSON.parse(localStorage.getItem("test"))
  } else {
    return [];
  }
}

let Whether = () => {

  let [city, setCity] = useState(getData());
  let [search, setSearch] = useState("");
  let [error, setError] = useState()
  let [init, setInit] = useState();





  const AddItem = async () => {


    let url =`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=bea4229211b6fb8be105d0a109b3f7a3`;
    let data = await fetch(url);
    let resJson = await data.json();


  console.log( resJson)
  if(resJson && resJson){

    setError(resJson.message)
  }
    if (resJson) {
       
    console.log(resJson.name)
     

    }

    {

      if (resJson.main) {
        let filter = city.findIndex(elem => elem.name === resJson.name)

        const data = {
          id: new Date().getMilliseconds().toString(),
          main: resJson.main,
          cityName: resJson.coord,
         icon:resJson.weather,
         name:resJson.name
        }




        if (filter >= 0) {

        } else if (city && city.length > 0) {
          setCity([...city, data])
          setSearch("")
        } else {

          setCity([...city, data])
        

        }
      }
    }

  }


  useEffect(() => {
    localStorage.setItem("test", JSON.stringify(city))

  }, [city, error])

  const Remove = () => {
    setCity([])
  }

  const deleteItem = (id) => {
    let filteredItems = city.filter((elem) => {
      return id !== elem.id
    })
    setCity(filteredItems)
  }


  const close = () => {
    setError("")

  }
  console.log(city)
  return (
    <>

      <h1 style={{ textAlign: "center", color: "lightgray", marginBottom: "20px", marginTop: "20px" }}>Whether App</h1>
      <div className='container-fluid'>

        <div className='container d-fl ex justify-content-center'>
          <div className="input-group mb-3">

            <input type="text" value={search} onChange={(event) => { setSearch(event.target.value) }} className="form-control text-center  text-dark" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" disabled={search === ""} onClick={AddItem}>Add</button>
          </div>
        </div>
        <div className='container d-flex justify-content-center'><button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={Remove}>Remove All</button></div>


        {error && error ? <div className="alert alert-warning alert-dismissible fade show my-3 " role="alert" style={{textAlign:"center"}}>
          <strong >No data found</strong>
          <button type="button" onClick={close} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> : ""}



        <>


         <div className='container'>
            <div className='row g-2 justify-content-center'>

              {city && city.map((elem) => {
                return <div key={elem.id} className='col-sm-6 '>
                  <div className='d-flex my-3 g-1 justify-content-center'>
                    <div className="card  text-dark" style={{ height: "255px", width: "300px" }}>


                      <div className="card-img-overlay" >
                        <button className=" btn btn-outline-secondary" style={{ float: "right" }} type="button" id="button-addon2" onClick={() => { deleteItem(elem.id) }}>delete</button>
                        <h1 className="card-title">{elem.name} </h1>
                        <p className='my-4 text-center'>Time: {new Date().toLocaleTimeString()} </p>
                        <p className="card-text  text-end" style={{ float: "right", fontSize: "15px" }} >Lat:{[elem.cityName.lat].toString().slice(0,2)}°</p>
                        <p style={{marginRight:"20px"}} className="card-text ">{elem.main.temp}°Cel</p>
                        <p className="card-text  text-end" style={{ float: "right", fontSize: "15px" }}> H:{elem.main.humidity}° </p>
                        <img src={elem.icon[0].icon} alt={elem.icon[0].description}/>


                      </div>
                    </div>
                  </div>

                </div>


              })}
            </div>
          </div>  

        </>



      </div>






    </>
  )
}


export default Whether;
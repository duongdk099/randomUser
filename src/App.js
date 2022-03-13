import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { first_css, list_css, button_css, cardcontent_css, horizonCSS } from './css.js';


function App() {
  const [datas, setDatas] = useState({
    name: "Barry PHAM",
    email: "duongdk69@gmail.com",
    DateNaissance: "30/03/2000",
    Nat: "Vietnam",
    Photo: "https://scontent.fsxb1-1.fna.fbcdn.net/v/t1.18169-9/10407075_1428375797430017_130941986603133352_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=19026a&_nc_ohc=gJpa05OYyS0AX8lEtse&_nc_ht=scontent.fsxb1-1.fna&oh=00_AT8Neb-RatbCQeSuhvinZ8MiTaAhSluxj5dQkoWrlk7x1A&oe=625416D4"
  });
  const [filters, setFilters] = useState({
    nbrAff: Number(null),
    Nat: ""
  })
  const [datasCartes, setDatasCartes] = useState([
    {
      Photo: "https://randomuser.me/api/portraits/men/53.jpg",
      email: "lenny.rodriguez@example.com",
      name: "Lenny Rodriguez"
    }, {
      Photo: "https://randomuser.me/api/portraits/women/68.jpg",
      email: "axelle.michel@example.com",
      name: "Axelle Michel"
    }
  ])

  const urlBase = 'https://randomuser.me/api/';

  const takedata = async () => {
    let data;
    axios.get(urlBase)
      .then(res => {
        data = res.data.results[0];
        let newDatas = {
          name: `${data.name.first} ${data.name.last}`,
          email: `${data.email}`,
          DateNaissance: `Birthday : ${dayjs(data.dob.date).format('DD/MM/YYYY')}`,
          Nat: `Nationalite : ${data.nat}`,
          Photo: `${data.picture.large}`
        }
        setDatas(newDatas)
      }
      )
    return data;
  }

  const takeDataCartes = async (nbrAff, Nat) => {

    let nbrCheck = nbrAff * 50;
    let ressss = new Array();
    await axios.get(`${urlBase}?results=${nbrCheck}`)
      .then(async (res) => {
        let datas = (res.data.results);
        for (let i = 0; i < nbrCheck; i++) {
          let data = datas[i];
          let newDatas = {
            name: `${data.name.first} ${data.name.last}`,
            email: `${data.email}`,
            Photo: `${data.picture.large}`
          }
          if (data.nat === Nat) {
            ressss.push(newDatas)
          }
          if (ressss.length === nbrAff) {
            break;
          }
        }
      })
    setDatasCartes(ressss)
    console.log(ressss);
  }


  useEffect(() => {
    let Nat = filters.Nat;
    let nbr = filters.nbrAff;
    if (Nat.length === 2 && nbr !== 0) {
      takeDataCartes(nbr, Nat);
    }
  }, [filters])

  const count = () => {
    let nbr = document.getElementById("nbrAff").value;
    let nat = document.getElementById("filterNat").value;
    if (nbr.length !== 0 && nat.length === 2) {
      let data = {
        nbrAff: Number(nbr),
        Nat: nat
      }
      setFilters(data);
    }

  }

  return (
    <div>
      <div id='first' >
        <button onClick={takedata} style={button_css} ><i className='fa fa-refresh' style={{ fontSize: "24px" }}></i></button>
        <div id='imageRight' style={{ marginLeft: "800px", marginBottom: "20px", }} >
          <Card sx={{ maxWidth: 300 }} style={{ border: "2px solid yellow", borderRadius: "30px " }}>
            <img style={first_css} src={datas.Photo} alt="avatar Doremon"></img>
            <CardContent
              style={cardcontent_css}>
              <Typography gutterBottom variant="h5" component="div">
                {datas.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {datas.email} <br />
                {datas.DateNaissance}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <hr style={horizonCSS}></hr>
      </div>

      <br></br>
      <div>
        <div id='Filter' style={{ marginLeft: "1200px" }} >
          <input onChange={count} style={{ width: '15%' }} id="nbrAff" type="number" min="1" max="30" placeholder='2'></input>
          <input onChange={count} style={{ width: '15%' }} id="filterNat" type="text" placeholder='FR'></input>

        </div>
        <br />
        <div id='dmm' style={list_css} >
          {datasCartes.map((item) => (
            <div key={item.email}>
              <Card sx={{ maxWidth: 450 }} style={{ height: "130px" }}>
                <img  src={item.Photo} alt="Just some random face" style={{ border: "1px solid ", }}></img>
                <CardContent style={{ position: "relative", paddingLeft: "140px", bottom: "130px" }} >
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.email}
                  </Typography>
                </CardContent>
              </Card>
              <br></br>
            </div>

          ))
          }
        </div>
      </div>

    </div >

  );
}

export default App;

let players = [
    {
      name: "Diego Fernandes",
      email: "diego@gmail.com",
      registrationDate: new Date(2024, 2, 1, 19, 23),
      dateCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
      name: "Mayk Brito",
      email: "mayk@gmail.com",
      registrationDate: new Date(2024, 2, 23, 19, 23),
      dateCheckIn: new Date(2024, 2, 25, 20, 20)
    },
    {
      name: "Ana Souza",
      email: "ana@gmail.com",
      registrationDate: new Date(2024, 0, 3, 19, 23),
      dateCheckIn: new Date(2024, 0, 4, 20, 20)
    },
    {
      name: "José Gomes de Menezes",
      email: "josegomesd6@gmail.com",
      registrationDate: new Date(2023, 11, 4, 19, 23),
      dateCheckIn: new Date(2023, 11, 5, 20, 20)
    },
    {
      name: "Maria Oliveira",
      email: "maria@gmail.com",
      registrationDate: new Date(2023, 10, 5, 19, 23),
      dateCheckIn: null
    },
    {
      name: "Pedro Santos",
      email: "pedro@gmail.com",
      registrationDate: new Date(2023, 9, 6, 19, 23),
      dateCheckIn: new Date(2023, 9, 7, 20, 20)
    },
    {
      name: "Carla Lima",
      email: "carla@gmail.com",
      registrationDate: new Date(2023, 8, 7, 19, 23),
      dateCheckIn: new Date(2023, 8, 8, 20, 20)
    },
    {
      name: "Lucas Sousa",
      email: "lucas@gmail.com",
      registrationDate: new Date(2023, 7, 8, 19, 23),
      dateCheckIn: null
    },
    {
      name: "Paula Costa",
      email: "paula@gmail.com",
      registrationDate: new Date(2023, 6, 9, 19, 23),
      dateCheckIn: null
    },
    {
      name: "Gabriel Almeida",
      email: "gabriel@gmail.com",
      registrationDate: new Date(2023, 5, 10, 19, 23),
      dateCheckIn: new Date(2023, 5, 11, 20, 20)
    }
  ]
  
  const creatNewPlayer = (player) => {

    const registrationDate = dayjs(Date.now()).to(player.registrationDate)
    let dateCheckIn = dayjs(Date.now()).to(player.dateCheckIn)

    if (player.dateCheckIn == null) {
      dateCheckIn = `
      <button 
        data-email="${player.email}"
        onclick="makeCheckIn(event)"
        >
        Confirmar check-in
      </button>
      `
    }


    return `
    <tr>
        <td>
          <strong>${player.name}</strong></br>
          <small>${player.email}</small>
        </td>
        <td>${registrationDate}</td>
        <td>${dateCheckIn}</td>
      </tr>
      `


  }
  
  
  const updateList = (players) => {
    let output = ""

    for(let player of players) {
        output += creatNewPlayer(player)
    }


    document.querySelector('tbody').innerHTML = output
  }
  
  updateList(players)


const addNewPlayer = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const player = {
    name: formData.get('nome'),
    email: formData.get('email'),
    registrationDate: new Date(),
    dateCheckIn: null,
  }

  const playerExist = players.find(
    (p) => {
      return p.email == player.email
    }
)

if (playerExist) {
  alert('Email ja cadastrado')
  return
}

  players = [player, ...players]
  updateList(players)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const makeCheckIn = (event) => {

  const messageConfirm = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(messageConfirm) == false) {  
    return
  }
  
  // find player in list
  const player = players.find((p) => {
    return p.email == event.target.dataset.email
  })

  // update check-in player
  player.dateCheckIn = new Date()

  // update list
  updateList(players)
}
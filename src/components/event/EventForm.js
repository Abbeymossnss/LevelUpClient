import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from "../../managers/GameManager"
import { createEvent } from "../../managers/EventManager"


export const EventForm = () => {
    const navigate = useNavigate()
    const [eventGame, setEventGame] = useState([])
    // const [eventGameType, setEventGameType] = useState( [])
    
    const [currentEvent, setCurrentEvent] = useState({
        date: "",
        game: 0,
        game_type: 0
        
    })

    useEffect(() => {
        // TODO: Get the games, then set the state
        // Fetch games from the server using getGames function
        getGames().then(eventGames => {
            setEventGame(eventGames)
        }).catch(error => {
            console.error(error)
        });
    }, [])

    // useEffect(() => {
    //     getGameTypes().then(eventGameTypes => {
    //         setEventGameType(eventGameTypes)
    //     }).catch(error => {
    //         console.error(error)
    //     })

    //     }, [])
    

    const changeEventState= (eventClick) => {

    const newEventState = {...currentEvent}
    newEventState[eventClick.target.name] = eventClick.target.value
    setCurrentEvent(newEventState)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm_title">Register Your Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of New Event: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game"> Event Game: </label>
                    <select name="game" value={currentEvent.game} onChange={changeEventState}>
                        <option value="" disabled>Select a game</option> {/* Games*/}
                        {eventGame.map(game => (
                            <option key={game.id} value={game.id}>{game.title}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

<button type="Submit Event" 
        onClick={evt => {
            evt.preventDefault()

            let currentGameType= 0

            for (const game of eventGame) {
                if (game.id === parseInt(currentEvent.game))
                {currentGameType=(game.game_type)
                }
                
            }
            const event = {
                date: currentEvent.date,
                game: currentEvent.game,
                game_type: currentGameType
                
            }
            createEvent(event)
            .then(() => navigate("/events"))
        }} 
                className="btn btn-primary">Create</button>     
        </form>
    )
}
// when the user creates a new event object, 
//they need to be able to select a new date and the game object by title.
//when the user clicks the create button the event state must update with the game (and it's game type)s 
//as well as the date.
//in order to grab the game title and gametype of the game object we must create a condition
//where the game type value must equal the game id. games.gameType=gameType.id
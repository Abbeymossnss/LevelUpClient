import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    const navigate = useNavigate()
    
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className= "events">
                        {<button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>}
            {
                events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <div className="date">Event On: {event.date}</div>
                            <div className="organizer">Organized By: {event.organizer.full_name}</div>
                            <div className="attendees">Gamers Attending This Event: {event.attendees.full_name}</div>
                            <div className="game">Game: {event.game.title}</div>
                            <div className= "game_type">Type of Game: {event.game_type.label}</div>
                            
                        </section>


                })


            }





        </article>
    )


}
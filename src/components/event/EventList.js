import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])


    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className= "events">
            {
                events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <div className="date">Event #1 On: {event.date}</div>
                            <div className="game">Game Title ID No.{event.game}</div>
                            <div className="game_type">Game Type ID No.{event.game_type}</div>
                            
                        </section>


                })


            }





        </article>
    )


}
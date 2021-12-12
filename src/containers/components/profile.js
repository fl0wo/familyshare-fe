import React from "react";

export const HasJwt = ({user, onKidSelect, events}) => {
    user = user?.data;
    return (
        <div>
            <h1>Welcome {user.role} {user.name}!</h1>
            <h3>
                {user.email}[{user.verified ? 'ok' : 'nok'}]
            </h3>
            <ul>
                {
                    user.childrens.map((kid, i) => (
                        <li>
                            <div
                                onClick={() => onKidSelect(i)}
                                style={{
                                    borderRadius: "50%",
                                    backgroundColor: kid.color,
                                    height: "25px",
                                    width: "25px"
                                }}/>
                            <span>{kid.name}</span>
                        </li>
                    ))
                }
            </ul>
            <h2>{new Date().getTime()}</h2>
            <div>
                {
                    events.map(e=>(
                        <p>{e.title}</p>
                    ))
                }
            </div>
        </div>
    );
}
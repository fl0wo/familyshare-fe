import React from "react";

export const HasJwt = ({
                           user,
                           onKidSelect,
                           onKidAdd,
                           onEventSelect}) => {
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
                            >
                                <span
                                    style={{
                                        borderRadius: "50%",
                                        backgroundColor: kid.color,
                                        height: "25px",
                                        width: "25px"
                                    }}
                                >----</span>
                                <span>{kid.name}</span>
                            </div>
                        </li>
                    ))
                }
                <button onClick={onKidAdd}>+</button>
            </ul>
            <h2>{new Date().getTime()}</h2>
            <div>
                {
                    <p onClick={()=>onEventSelect('-1')}>
                        Live following
                    </p>
                }
                {
                    user.events.map(e=>(
                        <p onClick={()=>onEventSelect(e._id)}>
                            {e.title}
                        </p>
                    ))
                }
            </div>
        </div>
    );
}
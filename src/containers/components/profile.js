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
                      <div key={kid+i}>
                        <span >{kid.name}</span>
                      </div>

/*                      <i
                        key={kid+i}
                        onClick={() => onKidSelect(i)}>
                        <li key={kid}>
                                <span
                                  style={{
                                    borderRadius: "50%",
                                    backgroundColor: kid.color,
                                    height: "25px",
                                    width: "25px"
                                  }}
                                >----</span>
                          <span>{kid.name}</span>
                        </li>
                      </i>*/
                  ))
                }
                <button onClick={onKidAdd}>+</button>
            </ul>
            <h2>{new Date().getTime()}</h2>
            <div key={'events'}>
                {
                    <button key='live' onClick={()=>onEventSelect('-1')}>
                        Live following
                    </button>
                }
                {
                    user.events.map(e=>(
                        <button key={e.title} onClick={()=>onEventSelect(e._id)}>
                            {e.title}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}
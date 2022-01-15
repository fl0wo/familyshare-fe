import React from "react";

export const HasJwt = ({
                           user,
                           onKidSelect,
                           onKidAdd,
                           onEventSelect}) => {

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
                        <span
                          style={{
                            borderRadius: "50%",
                            backgroundColor: kid.color,
                            height: "25px",
                            width: "25px"
                          }}
                        >----</span>
                        <span >{kid.name}</span>
                      </div>
                  ))
                }
            </ul>
        </div>
    );
}
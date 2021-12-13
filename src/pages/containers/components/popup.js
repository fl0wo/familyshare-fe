import React, {useEffect, useState} from "react";
import popupStyles from "../../custom-popup.module.css";
import PropTypes from "prop-types";

export const CustomPopup = (props) => {
    const [show, setShow] = useState(false);

    const closeHandler = (e) => {
        setShow(false);
        props.onClose(false);
    };

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    return (
        <div
            style={{
                visibility: show ? "visible" : "hidden",
                opacity: show ? "1" : "0"
            }}
            className={popupStyles.overlay}
        >
            <div className={popupStyles.popup}>
                <h2>{props.title}</h2>
                <span className={popupStyles.close} onClick={closeHandler}>
          &times;
        </span>
                <div className={popupStyles.content}>{props.children}</div>
            </div>
        </div>
    );
};

CustomPopup.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export const ExamplePopup = () => {
    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    return (
        <div>
            <button onClick={(e) => setVisibility(!visibility)}>Toggle Popup</button>

            <CustomPopup
                onClose={popupCloseHandler}
                show={visibility}
                title="Register kid"
            >
                <h1>Registriamo un bimbo</h1>
                <h2>Seee!</h2>
            </CustomPopup>
        </div>
    );
}
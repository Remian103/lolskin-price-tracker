import React, { useEffect } from "react";
import { Button, Icon } from "atomize";
import "../css/Modal.css";

function SkinModal(props) {
    const { isOpen, close } = props;

    // lock scrolling behind
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";

        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const className = (props.className || "") + " modal" + (isOpen ? " openModal" : "");
    /* silde in out css */
    return (<>
        <div className={className}>
            <section>
                <Button
                    h="2.5rem"
                    w="2.5rem"
                    bg="info700"
                    hoverBg="info800"
                    rounded="lg"
                    onClick={close}
                >
                    <Icon name="Cross" size="20px" color="white" />
                </Button>
                {props.children}
            </section>
        </div>
    </>);
}

export default SkinModal;
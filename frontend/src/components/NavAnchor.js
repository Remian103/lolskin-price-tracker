import React from 'react';
import '../css/NavAnchor.css';
import { Anchor, Button } from "atomize";

function Nav({ anchorList }) {

    return (
        <nav>
            { anchorList.map((item) =>
                <Anchor
                    key={item.id}
                    href={item.link}
                    m={{ l: "1rem", y: "0.5rem" }}
                >
                    <Button
                        bg="info700"
                        hoverBg="info600"
                        cursor="pointer"
                        rounded="md"
                    >
                        {item.name}
                    </Button>
                </Anchor>
            )}
        </nav>
    );
}

export default Nav
import React from 'react';
import "../css/Nav.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "atomize";

function Nav({ anchorList }) {

    return (
        <nav>
            { anchorList.map((item) => {
                if (item.type === "hash")
                    return (
                        <HashLink key={item.id}
                            smooth
                            to={item.link}
                        >
                            <Button
                                bg="info700"
                                hoverBg="info600"
                                cursor="pointer"
                                rounded="md"
                            >
                                {item.name}
                            </Button>
                        </HashLink>
                    );
                else if (item.type === "new-tab")
                    return (
                        <a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                        >
                            <Button
                                bg="info700"
                                hoverBg="info600"
                                cursor="pointer"
                                rounded="md"
                            >
                                {item.name}
                            </Button>
                        </a>
                    );
                else 
                    return (
                        <Link
                            key={item.id}
                            to={item.link}
                        >
                            <Button
                                bg="info700"
                                hoverBg="info600"
                                cursor="pointer"
                                rounded="md"
                            >
                                {item.name}
                            </Button>
                        </Link>
                    );
            })}
        </nav>
    );
}

export default Nav
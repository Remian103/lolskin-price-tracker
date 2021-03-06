import * as React from 'react';
import '../css/Nav.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button } from 'atomize';

import { AnchorObj } from '../interfaces/Nav.interface';

function Nav({ anchorList }: { anchorList: AnchorObj[] }) {
    return (
        <>
            {anchorList.map((item: AnchorObj) => {
                if (item.type === 'hash') {
                    return (
                        <HashLink
                            key={item.id}
                            smooth
                            to={item.link}
                            style={{ margin: '8px 0 8px 8px' }}
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
                }
                if (item.type === 'new-tab') {
                    return (
                        <a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{ margin: '8px 0 8px 8px' }}
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
                }
                return (
                    <Link
                        key={item.id}
                        to={item.link}
                        style={{ margin: '8px 0 8px 8px' }}
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
        </>
    );
}

export default Nav;

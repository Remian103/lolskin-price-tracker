import './NavAnchor.css';
import { Anchor, Button } from "atomize";

function Nav({ anchorList }) {

    const ret = anchorList.map((item) =>    
        <Anchor
            href={item.link}
            m={{ l: "1rem", y: "1rem" }}
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
    )

    return (
        <nav>
            {ret}
        </nav>
    )
}

export default Nav
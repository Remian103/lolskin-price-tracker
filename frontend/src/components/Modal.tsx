import * as React from 'react';
import { useEffect } from 'react';
import { Button, Icon } from 'atomize';
import '../css/Modal.css';

interface Props {
    className?: string;
    children: React.ReactNode;
    isOpen: boolean;
    closeFn(): void;
}

function Modal({ className, children, isOpen, closeFn }: Props) {
    // lock scrolling behind
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '16.8px';
        }

        return () => {
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('padding-right');
        };
    }, [isOpen]);

    /* silde in out css */
    return (
        <>
            <div
                className={`${className || ''} modal${isOpen ? ' openModal' : ''}`}
                onClick={closeFn}
            >
                <section
                    onClick={(e) => { e.stopPropagation(); }}
                >
                    <Button
                        h="2.5rem"
                        w="2.5rem"
                        bg="info700"
                        hoverBg="info800"
                        rounded="lg"
                        onClick={closeFn}
                    >
                        <Icon name="Cross" size="20px" color="white" />
                    </Button>
                    {children}
                </section>
            </div>
        </>
    );
}
Modal.defaultProps = { className: undefined };

export default Modal;

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Div, Input, Icon } from 'atomize';

import Carousel from './Carousel';
import Modal from './Modal';
import useDataFetch from '../hooks/useDataFetch';
import hangulFuzzyMatch from '../utils/utils';
import '../css/ChampBox.css';
import { ChampionObj, SkinObj } from '../interfaces/Fetch.interface';
import api from '../config.json';

function ChampBox() {
    // 챔피언 리스트 fetch
    const [champId, setId] = useState(0);
    const [{ isLoading: champLoading, isError: champError, data: champList }] = useDataFetch<ChampionObj[]>(`${api.backendAPI}/api/champions`, []);

    // modal window
    const [display, setDisplay] = useState(false);
    const [{ isLoading: skinLoading, isError: skinError, data: skinList }, doFetch] = useDataFetch<SkinObj[]>('initialUrl', []);
    useEffect(() => {
        if (display) { doFetch(`${api.backendAPI}/api/champions/${champId}/skins`); }
    }, [display, champId, doFetch]);

    // search by champion name
    const [word, setWord] = useState('');
    const [searchResultDom, setResult] = useState<React.ReactNode>(null);
    const mapFunction = (champion: ChampionObj) => (
        <Div
            key={champion.id}
            p="0.5rem"
        >
            <img
                className="champion-icon"
                src={champion.icon_url}
                alt={champion.name}
                title={champion.name}
                onClick={() => {
                    setId(champion.id);
                    setDisplay(true);
                }}
            />
        </Div>
    );
    useEffect(() => {
        if (word.length === 0) {
            setResult(champList.map(mapFunction));
            return;
        }
        // regular expression
        const regex = hangulFuzzyMatch(word);
        if (process.env.NODE_ENV !== 'production') console.log(word, regex);

        const result = champList.filter((champion: ChampionObj) => regex.test(champion.name));
        if (result.length === 0) {
            setResult(
                <Div
                    d="flex"
                    justify="center"
                    align="center"
                    h="20rem"
                    textSize="2rem"
                >
                    no result
                </Div>,
            );
        } else {
            setResult(result.map(mapFunction));
        }
    }, [champList, word]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    };

    const errorHandleDom = (loading : boolean) => {
        if (loading) return <p> is loading... </p>;
        return <p> something error </p>;
    };

    return (
        <>
            <Div p={{ x: '1rem' }}>
                <Input
                    placeholder="챔피언 이름"
                    onChange={handleInputChange}
                    suffix={(
                        <Icon
                            name="Search"
                            size="20px"
                            pos="absolute"
                            right="1rem"
                            transform="translateY(-50%)"
                            top="50%"
                        />
                    )}
                />
            </Div>
            <Div
                d="flex"
                justify="space-evenly"
                flexWrap="wrap"
                p="0.5rem"
            >
                {
                    champLoading || champError || !Array.isArray(champList)
                        ? errorHandleDom(champLoading)
                        : searchResultDom
                }
            </Div>

            <Modal className="skins" isOpen={display} closeFn={() => setDisplay(false)}>
                {
                    skinLoading || skinError || !Array.isArray(skinList)
                        ? errorHandleDom(skinLoading)
                        : <Carousel list={skinList} type="champion-skins" />
                }
            </Modal>
        </>
    );
}

export default ChampBox;

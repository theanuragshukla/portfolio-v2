
import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function CustomText({ children:text}) {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));



    const getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomCharacter = (
        characters = ["0", "1"]
    ) => {
        return characters[getRandomInteger(0, characters.length - 1)];
    };


    const [words, setWords] = useState([])
    useEffect(() => {
        setWords(() => {
            const ret = []
            text.split(" ").forEach(str => ret.push([...str.split("")]))
            return ret
        })
    }, [text])

    const shuffle = async (i) => {
        const original = words[i].slice(0);

        const n = original.length
        for (let j = 0; j < n; j++) {
            setWords((prev) => {
                const arr = [...prev]
                arr[i][j] = randomCharacter()
                return arr
            })
            await sleep(100)
        }

        for (let j = 0; j < n; j++) {
            setWords((prev) => {
                const arr = [...prev]
                arr[i][j] = original[j]
                return arr
            })
            await sleep(100)
        }
    }



    return <Flex flexWrap="wrap">
        {words.map((w, i) => <Flex key={`word${i}`} onMouseEnter={() => shuffle(i)}>{w.map((c, j) => <Box key={`word${i}char${j}`} >{c}</Box>)}&nbsp;</Flex>)}
    </Flex>
}

export default CustomText

import React, { useEffect, useState } from "react";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomCharacter = (
    characters = [
        "A",
        "a",
        "B",
        "b",
        "C",
        "c",
        "D",
        "d",
        "E",
        "e",
        "F",
        "f",
        "G",
        "g",
        "H",
        "h",
        "I",
        "i",
        "J",
        "j",
        "K",
        "k",
        "L",
        "l",
        "M",
        "m",
        "N",
        "n",
        "O",
        "o",
        "P",
        "p",
        "Q",
        "q",
        "R",
        "r",
        "S",
        "s",
        "T",
        "t",
        "U",
        "u",
        "V",
        "v",
        "W",
        "w",
        "X",
        "x",
        "Y",
        "y",
        "Z",
        "z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "-",
        "_",
        "+",
        "=",
        "{",
        "}",
        "[",
        "]",
        "|",
        "\\",
        "<",
        ">",
        "?",
        "/",
        "~",
    ]
) => {
    return characters[getRandomInteger(0, characters.length - 1)];
};

const Resolver = ({
    strings,
    constant = "",
    loop = true,
    timeout = 10,
    iterations = 5,
    callback = () => {},
}) => {
    const [strs, setStrs] = useState([]);
    const [resolved, setResolved] = useState("");
    useEffect(() => {
        if (strs.length === 0) return;
        const resolve = async (str, offset = -1, noDelete = false) => {
            let n = str.length,
                i = offset;
            while (i <= n) {
                let iter = iterations;
                while (iter-- > 0) {
                    setResolved(() => str.substring(0, i) + randomCharacter());
                    await sleep(timeout);
                }
                setResolved(() => str.substring(0, i++));
                await sleep(timeout);
            }
            if (noDelete) return;
            await sleep(1000);
            while (--n >= offset) {
                setResolved((e) => e.substring(0, n));
                await sleep(timeout);
            }
        };
        const tmp = async () => {
            const n = strs.length;
            let idx = -1;
            while (idx < n - 1 || loop) {
                const todo = constant + strs[++idx % n];
                await resolve(todo, constant.length, n === 1 && !loop);
                await sleep(1000);
            }
        };
        tmp();
        return () => callback();
    }, [strs]);
    useEffect(() => {
        setStrs(() => [...strings]);
    }, [strings]);

    return <>{resolved}</>;
};

export default Resolver;

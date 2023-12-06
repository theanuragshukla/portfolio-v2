import {
    Box,
    Flex,
    Grid,
    GridItem,
    IconButton,
    ThemeProvider,
} from "@chakra-ui/react";
import { Home } from "iconsax-react";
import { useState } from "react";
import CanvasRandomCharacters from "./CanvasRandomCharacters";
import FloatingText from "./FloatingText";
import Nav from "./Nav";
import Resolver from "./Shuffler";
import Terminal from "./Terminal";
import theme from "./theme";
import CanvasComponent from "./Canvas";
import CustomText from "./CustomText";

function App() {
    const hotBar = [
        {
            name: "Home",
            Icon: <Home />,
        },
        {
            name: "Home",
            Icon: <Home />,
        },
        {
            name: "Home",
            Icon: <Home />,
        },
    ];

    const [wins, setWins] = useState([
        /* {
           id: 1,
           title: "Terminal",
           active: false,
           height: 300,
           width: 500,
           max: false,
           min: false,
           element: Terminal,
         },*/
    ]);

    return (
        <ThemeProvider theme={theme}>
            <Grid minH="100vh" templateRows="40px 1fr">
                <GridItem>
                    <Nav />
                </GridItem>
                <GridItem>
                    <Grid templateColumns="0px 1fr">
                        <GridItem>
                            <Flex
                                flexDir="column"
                                align="center"
                                gap={2}
                                justify="center"
                                height="100%"
                            >
                                {hotBar.map(({ Icon }) => {
                                    return <IconButton icon={Icon} />;
                                })}
                            </Flex>
                        </GridItem>
                        <GridItem>

                            <Box >
                                {wins.map((e) => {
                                    return <e.element info={e} wins={wins} setWins={setWins} />;
                                })}
                                <CustomText text="

        Hello world, My name is Anurag Shukla
          "/>
                            </Box>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </ThemeProvider>
    );
}

export default App;

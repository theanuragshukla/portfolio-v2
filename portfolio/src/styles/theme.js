import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
    body: 'League Spartan, sans-serif',
    heading: 'Nunito, sans-serif',
  },
    styles: {
        global: {
            body: {
                transitionProperty: "all",
                transitionDuration: "500ms",
                transitionTimingFunction:"ease-in-out",
                fontFamily:"Nunito, sans-serif"
            }
        }
    },
    config: {
        disableTransitionOnChange: false
    }

})

export default theme

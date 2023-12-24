import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
    body: 'Nunito, sans-serif',
    heading: 'Nunito, sans-serif',
  },
    styles: {
        global: {
            body: {
                transitionProperty: "background-color , color",
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

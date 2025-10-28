import React from 'react';
import { createContext, useContext } from 'react';
import { lightTheme, darkTheme } from './styles/Theme'
import { useColorScheme } from 'react-native';

// create theme constant
const ThemeContext = createContext(lightTheme)

export const ThemeProvider =({children}) => {
    const scheme = useColorScheme() // 'light' or 'dark'
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    return(
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
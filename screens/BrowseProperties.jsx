import { View, StyleSheet, Text } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TextField from "../components/TextField";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "../ThemeContext";
import Filter from "../components/PropertyFilters";
import BrowsePropertyCard from "../components/BrowsePropertyCard";


const BrowseProperties = () => {

    const theme = useTheme()
    console.log(theme.borderLeft)

    return (
        <View style={[browse.container, theme.container]}>
            <View style={browse.content}>
                <View style={browse.searchbar}>
                    <Icon name="search" size={24} color={theme.textColor.color} style={browse.searchIcon}/>
                    <TextField
                    placeholder="Search"
                    style={[browse.customTextField]}
                    />
                </View>
                <View style={browse.filters}>
                    <Filter
                    text="Favorites"
                    iconName="heart"
                    />
                    <Filter
                    text="History"
                    iconName="clock"
                    />
                    <Filter
                    text="Following"
                    iconName="user-check"
                    />
                </View>
                <BrowsePropertyCard />
                <View style={{ flex: 1 }}>
                {/* Bottom Navigation Bar */}
                <BottomNavBar selectedTab="search" />
                </View>
            </View>
        </View>
    );
}
export default BrowseProperties;

const browse = StyleSheet.create({
    container:{
        flex: 1,
    },
    content:{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10
    },
    searchbar:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    searchIcon:{
        paddingRight: 10,
        alignContent: 'center'
    },
    customTextField:{
        flex: 1,
    },
    filters:{
        flexDirection: 'row',
        gap: 10,
        paddingLeft: 10,
        paddingBottom: 23,
    }
})
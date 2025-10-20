import { View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";

const BrowseProperties = () => {
    return (
        <View style={{ flex: 1 }}>
        {/* Bottom Navigation Bar */}
        <BottomNavBar selectedTab="search" />
        </View>
    );
}
export default BrowseProperties;

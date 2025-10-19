import { View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
const MessagesOverview = () => {
    return (
        <View style={{ flex: 1 }}>
        {/* Bottom Navigation Bar */}
        <BottomNavBar selectedTab="messages" />
        </View>
    );
}
export default MessagesOverview;
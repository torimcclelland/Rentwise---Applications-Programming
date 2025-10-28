import { View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";

const Notifications = () => {
    return (
        <View style={{ flex: 1 }}>
        {/* Bottom Navigation Bar */}
        <BottomNavBar selectedTab="notifications" />
        </View>
    );
}
export default Notifications;
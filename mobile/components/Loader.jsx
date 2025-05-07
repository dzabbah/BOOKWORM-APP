import { View, Text, ActivityIndicator } from "react-native";

export default function Loader({size="large"}) {
    return (
    <View 
            style={{
                flex:1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fce4ec"
            }}
    >
        <ActivityIndicator size={size} color={"#EC407A"} />
     </View>
    )
}

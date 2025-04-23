import { Link} from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Worm!</Text>
      <Image cachePolicy={"none"}/>

      <Link  href="/(auth)/signup">Sign Up Page</Link>
      <Link  href="/(auth)">Login Page</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  title: {color:"green"},
})

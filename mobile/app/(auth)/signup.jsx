import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Link } from "expo-router";
import styles from "../../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";


export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

   const { user, isLoading, register, token } =  useAuthStore();

    const router = useRouter();

    const handleSignUp = async () => {
        const result = await register(username, email, password);
      
        if (!result.success) Alert.alert("Error", result.error);
      };
      
      console.log(user);
      console.log(token);

    return (
        <KeyboardAvoidingView
            style={{ flex:1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.container}>
                <View style={styles.card}>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>BookWorm🐛</Text>
                        <Text style={styles.subtitle}>Share your favorite reads</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* USER FULLNAME INPUT */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputContainer}>
                              <Ionicons 
                               name="person-outline"
                               size={20}
                               color={COLORS.primary}
                               style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Serge Rufin"
                                placeholderTextColor={COLORS.placeholderText}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                            </View>
                        </View>
                    </View>

            {/* EMAIL INPUT */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <Ionicons
                        name="mail-outline"
                        size={20}
                        color={COLORS.primary}
                        style={styles.inputIcon}            
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="sergerufin@dzabbah.com"
                        placeholderTextColor={COLORS.placeholderText}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
            </View>         

            {/* PASSWORD INPUT */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                    {/* LEFT ICONS */}
                    <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={COLORS.primary}
                        style={styles.inputIcon}            
                    />
                    {/* INPUT */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor={COLORS.placeholderText}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        //keyboardType="email-address"
                        //autoCapitalize="none"
                    />
                     {/* LEFT ICONS */}
                    <TouchableOpacity 
                        onPress={ () => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                    <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={COLORS.primary}
                        // style={styles.inputIcon}            
                    />
                    </TouchableOpacity>

                </View>
            </View>

            {/* SIGNUP BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}
            disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                )}
                </TouchableOpacity>


                {/* FOOTER */} 
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <Link href="/" asChild>
                        <TouchableOpacity>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </Link>
                </View>    

                </View>
              </View>
        </KeyboardAvoidingView>
    );
}

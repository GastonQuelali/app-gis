import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { useTheme } from "@/hooks/use-theme";

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleBiometricAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Error", "Este dispositivo no soporta autenticación biométrica");
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert("Error", "No hay credenciales biométricas registradas");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autentícate para acceder",
        cancelLabel: "Cancelar",
        disableDeviceFallback: false,
      });

      if (result.success) {
        Alert.alert("Éxito", "Autenticación biométrica exitosa", [
          { text: "OK", onPress: () => router.replace("/(tabs)") }
        ]);
      } else {
        Alert.alert("Error", "Autenticación fallida");
      }
    } catch (_error) {
      Alert.alert("Error", "No se pudo completar la autenticación");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleNext = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu email o usuario");
      return;
    }
    router.push({ pathname: "/password", params: { email } });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background.primary }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={[styles.logoPlaceholder, { backgroundColor: theme.accent.blue }]}>
            <Text style={[styles.logoText, { fontFamily: "Poppins-Bold" }]}>GIS</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.text.primary, fontFamily: "Poppins-Bold" }]}>
          Sistema de Catastro
        </Text>
        <Text style={[styles.subtitle, { color: theme.text.secondary, fontFamily: "Poppins" }]}>
          Cochabamba - Bolivia
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text.primary, fontFamily: "Poppins-SemiBold" }]}>
            Email / Usuario
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: theme.background.tertiary, 
                borderColor: theme.border.default,
                color: theme.text.primary,
                fontFamily: "Poppins"
              }
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="Ingresa tu email"
            placeholderTextColor={theme.text.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            styles.biometricButton,
            isAuthenticating && styles.buttonDisabled,
            { backgroundColor: theme.accent.green }
          ]}
          onPress={handleBiometricAuth}
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.biometricIcon}>👆</Text>
              <Text style={[styles.buttonText, { fontFamily: "Poppins-SemiBold" }]}>
                Usar Huella Digital
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button, 
            !email.trim() && styles.buttonDisabled,
            { backgroundColor: theme.accent.blue }
          ]}
          onPress={handleNext}
          disabled={!email.trim()}
        >
          <Text style={[styles.buttonText, { fontFamily: "Poppins-SemiBold" }]}>
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  biometricButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  biometricIcon: {
    fontSize: 20,
    marginRight: 8,
  },
});

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

export default function LoginScreen() {
  const router = useRouter();
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>GIS</Text>
          </View>
        </View>

        <Text style={styles.title}>Sistema de Catastro</Text>
        <Text style={styles.subtitle}>Cochabamba - Bolivia</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email / Usuario</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ingresa tu email"
            placeholderTextColor="#999"
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
          ]}
          onPress={handleBiometricAuth}
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.biometricIcon}>👆</Text>
              <Text style={styles.buttonText}>Usar Huella Digital</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !email.trim() && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!email.trim()}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
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
    backgroundColor: "#007AFF",
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
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  biometricButton: {
    backgroundColor: "#34C759",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  biometricIcon: {
    fontSize: 20,
    marginRight: 8,
  },
});

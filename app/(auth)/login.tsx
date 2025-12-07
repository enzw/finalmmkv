import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { router, } from "expo-router";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { set } from "@/storage/asyncStorage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async () => {
    setErr("");
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCred.user;

      await set("user", { uid: user.uid, email: user.email });

      router.replace("(tabs)");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 24, marginTop: 100 }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Login</Text>
      {err ? <Text style={{ color: "red" }}>{err}</Text> : null}

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 16 }} />

      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "#2e78b7", padding: 14, borderRadius: 8, alignItems: "center" }}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white" }}>Sign In</Text>}
      </TouchableOpacity>
      
      <Link href="/(auth)/register" style={{ marginTop: 16, textAlign: "center", color: "#2e78b7" }}>
        Belum punya akun? Register
      </Link>
      
    </View>
  );
}

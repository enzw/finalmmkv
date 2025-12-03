import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { set } from '@/storage/asyncStorage';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleRegister = async () => {
    setErr("");
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCred.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
      });

      // SIMPAN USER DI ASYNCSTORAGE
      await set("user", {
        uid: user.uid,
        email,
        name,
      });

      router.replace("(tabs)");
    } catch (e: any) {
      setErr(e.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 24, marginTop: 100 }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Register</Text>

      {err ? <Text style={{ color: "red" }}>{err}</Text> : null}

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#2e78b7",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white" }}>Register</Text>}
      </TouchableOpacity>

      <Link href="/(auth)/login" style={{ marginTop: 18, color: "#2e78b7" }}>
        Sudah punya akun? Login
      </Link>
    </View>
  );
}
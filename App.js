import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

const categories = [
  { id: '1', name: 'Italiano', emoji: '🍕', foods: ['Pizza', 'Carbonara', 'Lasanha', 'Risoto'] },
  { id: '2', name: 'Oriental', emoji: '🍣', foods: ['Sushi', 'Guioza', 'Lámen', 'Pad Thai'] },
  { id: '3', name: 'Fast-food', emoji: '🍔', foods: ['Hambúrguer', 'Batata frita', 'Hot Dog'] },
  { id: '4', name: 'Brasileira', emoji: '🍖', foods: ['Feijoada', 'Churrasco', 'Coxinha'] },
  { id: '5', name: 'Saudável', emoji: '🥗', foods: ['Salada', 'Bowl', 'Frango grelhado'] },
  { id: '6', name: 'Mexicana', emoji: '🌮', foods: ['Tacos', 'Burrito', 'Nachos'] },
  { id: '7', name: 'Aleatório', emoji: '🤪', foods: ['Pizza', 'Sushi', 'Hambúrguer', 'Feijoada', 'Tacos', 'Salada'] },
]

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [result, setResult] = useState(null)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍽️ ShakEat</Text>

      <View style={styles.grid}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, selectedCategory?.id === item.id && styles.cardSelected]}
            onPress={() => {
              setSelectedCategory(item)
              setResult(null)
            }}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <Text style={styles.cardName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resultArea}>
        {!selectedCategory && (
          <Text style={styles.hint}>Escolha uma categoria! 👆</Text>
        )}
        {selectedCategory && !result && (
          <Text style={styles.hint}>Chacoalhe o celular! 📱</Text>
        )}
        {result && (
          <Text style={styles.result}>{result}</Text>
        )}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 50 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { width: '47%', margin: '1.5%', padding: 20, backgroundColor: '#f0f0f0', borderRadius: 12, alignItems: 'center' },
  cardSelected: { backgroundColor: '#FFE0B2', borderWidth: 2, borderColor: '#FF6600' },
  cardEmoji: { fontSize: 36 },
  cardName: { fontSize: 16, marginTop: 8, fontWeight: '600' },
  resultArea: { alignItems: 'center', marginTop: 30, padding: 20 },
  hint: { fontSize: 18, color: '#888', textAlign: 'center' },
  result: { fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
})
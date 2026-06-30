// Importa a barra de status do Expo (parte superior do celular)
import { StatusBar } from 'expo-status-bar';

// Componentes básicos do React Native
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// Importa Hooks do React
// useState -> guarda informações que mudam na tela
// useEffect -> executa ações quando algo acontece
// useRef -> guarda um valor sem causar nova renderização
import { useState, useEffect, useRef } from 'react';


// Ele permite detectar quando o usuário chacoalha o aparelho.
import { Accelerometer } from 'expo-sensors';


// Lista de categorias disponíveis no aplicativo.
const categories = [
  { id: '1', name: 'Italiano', emoji: '🍕', foods: ['Pizza', 'Carbonara', 'Lasanha', 'Risoto'] },
  { id: '2', name: 'Oriental', emoji: '🍣', foods: ['Sushi', 'Guioza', 'Lámen', 'Pad Thai'] },
  { id: '3', name: 'Fast-food', emoji: '🍔', foods: ['Hambúrguer', 'Batata frita', 'Hot Dog'] },
  { id: '4', name: 'Brasileira', emoji: '🍖', foods: ['Feijoada', 'Churrasco', 'Coxinha'] },
  { id: '5', name: 'Saudável', emoji: '🥗', foods: ['Salada', 'Bowl', 'Frango grelhado'] },
  { id: '6', name: 'Mexicana', emoji: '🌮', foods: ['Tacos', 'Burrito', 'Nachos'] },
  { id: '7', name: 'Aleatório', emoji: '🤪', foods: ['Pizza', 'Sushi', 'Hambúrguer', 'Feijoada', 'Tacos', 'Salada'] },
];

export default function App() {

  // Guarda qual categoria o usuário escolheu e o resultado do sorteio
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [result, setResult] = useState(null);

  // Guarda o horário do último chacoalho detectado.
  // Isso evita que vários sorteios aconteçam ao mesmo tempo.
  const lastShake = useRef(0);

  // useEffect executa quando a categoria muda.
  // e também tem as configurações do acelerômetro.
  useEffect(() => {

    // O acelerômetro será atualizado a cada 100 milissegundos.
    Accelerometer.setUpdateInterval(100);

    // Escuta continuamente os movimentos do celular.
    const subscription = Accelerometer.addListener(({ x, y, z }) => {

      // Calcula a intensidade do movimento utilizando os três eixos.
      const force = Math.sqrt(x * x + y * y + z * z);

      // Obtém o horário atual.
      const now = Date.now();

      // Se a força for maior que 2.8
      // e já tiver passado 1 segundo desde o último sorteio
      if (force > 2.8 && now - lastShake.current > 1000) {

        // Atualiza o horário do último chacoalho.
        lastShake.current = now;

        // Só sorteia se existir uma categoria escolhida.
        if (selectedCategory) {

          // Pega todas as comidas da categoria.
          const foods = selectedCategory.foods;

          // Escolhe uma posição aleatória da lista.
          const random = foods[Math.floor(Math.random() * foods.length)];

          // Atualiza a tela com a comida sorteada.
          setResult(random);
        }
      }
    });

    // Remove o sensor quando a tela deixar de usar esse efeito.
    return () => subscription.remove();

  }, [selectedCategory]);

  return (

    <ScrollView style={styles.container}>

      {/* Título do aplicativo */}
      <Text style={styles.title}>🍽️ ShakEat</Text>

      {/* Área que exibe todas as categorias */}
      <View style={styles.grid}>

        {/* Percorre a lista de categorias e cria um botão para cada uma */}
        {categories.map((item) => (

          <TouchableOpacity
            key={item.id}

            // Aplica um estilo diferente quando a categoria está selecionada.
            style={[
              styles.card,
              selectedCategory?.id === item.id && styles.cardSelected
            ]}

            // Quando o usuário toca na categoria...
            onPress={() => {

              // Guarda a categoria escolhida.
              setSelectedCategory(item);

              // Limpa o resultado anterior.
              setResult(null);
            }}
          >

            {/* Emoji da categoria */}
            <Text style={styles.cardEmoji}>{item.emoji}</Text>

            {/* Nome da categoria */}
            <Text style={styles.cardName}>{item.name}</Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* Só mostra o botão se existir uma categoria selecionada */}
      {selectedCategory && (

        <TouchableOpacity

          style={styles.shakeButton}

          // Caso o celular não tenha acelerômetro,
          // o usuário também pode clicar no botão para sortear.
          onPress={() => {

            const foods = selectedCategory.foods;

            // Escolhe uma comida aleatória.
            const random = foods[Math.floor(Math.random() * foods.length)];

            // Atualiza o resultado.
            setResult(random);
          }}
        >

          <Text style={styles.shakeButtonText}>
            🎲 Sortear!
          </Text>

        </TouchableOpacity>

      )}

      {/* Área onde aparecem as mensagens e o resultado */}
      <View style={styles.resultArea}>

        {/* Mensagem quando nenhuma categoria foi escolhida */}
        {!selectedCategory && (
          <Text style={styles.hint}>
            Escolha uma categoria! 👆
          </Text>
        )}

        {/* Mensagem quando já escolheu categoria mas ainda não sorteou */}
        {selectedCategory && !result && (
          <Text style={styles.hint}>
            Chacoalhe o celular! 📱
          </Text>
        )}

        {/* Exibe o resultado quando houver sorteio */}
        {result && (
          <Text style={styles.result}>
            {result}
          </Text>
        )}

      </View>

      {/* Barra de status do celular */}
      <StatusBar style="auto" />

    </ScrollView>

  );
}

// Estilos do aplicativo.
// Toda a aparência da interface fica organizada aqui.
const styles = StyleSheet.create({

  // Tela principal
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  // Título
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50
  },

  // Organização das categorias em formato de grade
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  // Cartão padrão das categorias
  card: {
    width: '47%',
    margin: '1.5%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center'
  },

  // Estilo aplicado quando a categoria é selecionada
  cardSelected: {
    backgroundColor: '#FFE0B2',
    borderWidth: 2,
    borderColor: '#FF6600'
  },

  // Emoji
  cardEmoji: {
    fontSize: 36
  },

  // Nome da categoria
  cardName: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600'
  },

  // Área do resultado
  resultArea: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20
  },

  // Texto de orientação
  hint: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center'
  },

  // Resultado do sorteio
  result: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  // Botão de sortear
  shakeButton: {
    backgroundColor: '#FF6600',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 16
  },

  // Texto do botão
  shakeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }

});
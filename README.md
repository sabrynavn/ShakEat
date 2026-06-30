# ShakEat

Aplicativo mobile desenvolvido em React Native com Expo para sortear o que comer. Escolha uma categoria culinária e descubra sua refeição tocando no botão ou chacoalhando o dispositivo.

## Recursos e Funcionalidades

- **Categorias Culinárias:** Escolha entre Italiano, Oriental, Fast-food, Brasileira, Saudável, Mexicana e Aleatório.
- **Sensor de Movimento (Acelerômetro):** Sorteio ativado por gestos físicos (chacoalhar) utilizando o `expo-sensors`.
- **Feedback Háptico:** Vibrações físicas calibradas (`expo-haptics`) ao gerar um resultado para melhorar a experiência do usuário (UI/UX).
- **Botão de Sorteio:** Alternativa ao shake para sortear uma opção com um toque.
- **Destaque Visual:** A categoria selecionada é destacada na tela para melhor orientação do usuário.

## Tecnologias e Dependências

- React Native & Expo (SDK 54)
- React Hooks: `useState`, `useEffect`, `useRef` para gerenciamento eficiente de ciclo de vida e performance.
- `expo-sensors`: Monitoramento em tempo real do hardware do acelerômetro.
- `expo-haptics`: Engine de respostas táteis para imersão física.

## Estrutura do Projeto
ShakEat/
├── App.js          # Tela principal com lógica de sorteio e interface
├── assets/         # Ícones e imagens do app
├── app.json        # Configurações do Expo
└── package.json    # Dependências do projeto

## Detalhes Técnicos Relevantes

**Lógica do Sensor:** A detecção do chacoalho mapeia os eixos tridimensionais (X, Y, Z) do acelerômetro baseando-se na gravidade, aplicando o cálculo da magnitude do vetor: `forcaTotal = sqrt(x² + y² + z²)`. Quando a força aplicada supera o limiar de 2.8, a função de sorteio é invocada. O hook utiliza `useRef` para controlar o intervalo entre sorteios e evitar acionamentos duplos.

## Como Executar o Projeto

```bash
git clone https://github.com/sabrynavn/ShakEat.git
cd ShakEat
npm install
npx expo start --lan
```

Abra o app **Expo Go** no Android e escaneie o QR Code exibido no terminal.

## Autora

Desenvolvido por **Sabrynavn** durante o aprendizado de React Native e Expo.

[![GitHub](https://img.shields.io/badge/GitHub-sabrynavn-black?style=flat&logo=github)](https://github.com/sabrynavn)

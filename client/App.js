/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TextInput,
  Text
} from 'react-native';

import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        onEndEditing={function () {
          window.Evennia.msg('text', [text])
          onChangeText('')
        }}
      />
    </SafeAreaView>
  );
};

const App: () => Node = () => {

  scrollToEnd = () => {
    console.log('r u scroll')
    this.scrollView.scrollToEnd();
  }

  const [serverMessages, setServerMessages] = React.useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  useEffect( (e) => {
    const serverMessagesList = [];
    Evennia.emitter.on('text', (msg) => {
      serverMessagesList.push(msg[0]);
      setServerMessages([...serverMessagesList])
    })
  },[])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
          <Text>Show webview</Text>
          <WebView source={{ html: serverMessages.join('<br/><br/>') }} style={{ width: '100%', height: 600, backgroundColor: 'blue', marginTop: 20 }} />
        </View>
      </ScrollView>
      <UselessTextInput/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
